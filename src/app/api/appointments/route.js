import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendEmail } from "@/lib/email";
import { emailTemplates } from "@/lib/emailTemplates";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  // Only admins can get all appointments
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [appointments] = await db.query("SELECT * FROM appointments ORDER BY createdAt DESC");
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { patientName, email, phone, serviceId, serviceName, date, time, condition, price } = body;

  if (!patientName || !email || !serviceId || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const [existingPatients] = await db.query("SELECT * FROM patients WHERE email = ?", [email.toLowerCase()]);
    let patient = existingPatients[0];
    let plainPassword = null;

    if (!patient) {
      const patientId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
      // Generate a random secure password
      plainPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      
      const newPatient = {
        id: patientId,
        name: patientName,
        email: email.toLowerCase(),
        phone: phone || "",
        condition_desc: condition || serviceName,
        password: hashedPassword,
        lastVisit: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        totalAppointments: 1,
      };

      await db.query(`
        INSERT INTO patients (id, name, email, phone, condition_desc, password, lastVisit, totalAppointments) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [newPatient.id, newPatient.name, newPatient.email, newPatient.phone, newPatient.condition_desc, newPatient.password, newPatient.lastVisit, newPatient.totalAppointments]);
      patient = newPatient;
    } else {
      await db.query(`
        UPDATE patients SET totalAppointments = totalAppointments + 1, lastVisit = ? WHERE id = ?
      `, [new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), patient.id]);
    }

    const appointmentId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await db.query(`
      INSERT INTO appointments (id, patientId, patientName, email, phone, serviceId, serviceName, date, time, status, condition_desc, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [appointmentId, patient.id, patientName, email, phone || "", serviceId, serviceName, date, time, "Pending", condition || serviceName, createdAt]);

    const invoiceId = `INV-${Math.floor(2000 + Math.random() * 9000)}`;
    await db.query(`
      INSERT INTO invoices (id, appointmentId, patientName, amount, status, date)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [invoiceId, appointmentId, patientName, price || 120.0, "Pending", new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })]);

    // Send confirmation email asynchronously
    const emailHtml = emailTemplates.bookingConfirmation({
      patientName,
      serviceName,
      date,
      time,
      email,
      plainPassword,
    });
    
    sendEmail({ to: email, subject: "Booking Confirmation - Zenith Physiotherapy", html: emailHtml });

    return NextResponse.json({ success: true, appointmentId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}

