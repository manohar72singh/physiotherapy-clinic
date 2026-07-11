import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { sendEmail } from "@/lib/email";
import { emailTemplates } from "@/lib/emailTemplates";

export async function POST(request, { params }) {
  const resolvedParams = await params;
  const invoiceId = resolvedParams.id;
  
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // First, get the invoice to verify ownership if user is a patient
    const [invoices] = await db.query(`
      SELECT i.*, a.patientId, a.email as patientEmail 
      FROM invoices i 
      JOIN appointments a ON i.appointmentId = a.id 
      WHERE i.id = ?
    `, [invoiceId]);
    
    if (invoices.length === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    
    const invoice = invoices[0];
    
    // Ensure patient can only pay their own invoice, but admin can pay any
    if (session.user.role === "patient" && session.user.id !== invoice.patientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update the invoice status to 'Paid'
    await db.query(`
      UPDATE invoices SET status = 'Paid' WHERE id = ?
    `, [invoiceId]);

    // Send Payment Receipt Email asynchronously
    if (invoice.patientEmail) {
      const emailHtml = emailTemplates.paymentReceipt({
        patientName: invoice.patientName,
        serviceName: invoice.serviceName || "Physiotherapy Service", // Depending on join, it might be in appointments table
        amount: invoice.amount,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        invoiceId: invoice.id
      });
      sendEmail({ to: invoice.patientEmail, subject: "Payment Receipt - Zenith Physiotherapy", html: emailHtml });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 });
  }
}
