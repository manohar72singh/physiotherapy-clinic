import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { sendEmail } from "@/lib/email";
import { emailTemplates } from "@/lib/emailTemplates";

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const body = await request.json();
  const { status } = body;

  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id]);
    
    if (status === "Completed") {
      await db.query("UPDATE invoices SET status = 'Paid' WHERE appointmentId = ?", [id]);
    }

    // Fetch appointment details to send email
    const [appointments] = await db.query("SELECT * FROM appointments WHERE id = ?", [id]);
    if (appointments.length > 0) {
      const apt = appointments[0];
      if (apt.email) {
        const emailHtml = emailTemplates.appointmentStatusUpdate({
          patientName: apt.patientName,
          serviceName: apt.serviceName,
          date: apt.date,
          time: apt.time,
          status: status
        });
        sendEmail({ to: apt.email, subject: `Appointment ${status} - Zenith Physiotherapy`, html: emailHtml });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}
