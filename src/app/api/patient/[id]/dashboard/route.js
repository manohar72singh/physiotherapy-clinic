import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Ensure patient can only access their own dashboard, but admin can access any
  if (session.user.role === "patient" && session.user.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const [appointments] = await db.query("SELECT * FROM appointments WHERE patientId = ? ORDER BY createdAt DESC", [id]);
    const [invoices] = await db.query(`
      SELECT i.*, a.serviceName, a.date as appointmentDate 
      FROM invoices i 
      JOIN appointments a ON i.appointmentId = a.id 
      WHERE a.patientId = ? ORDER BY i.id DESC
    `, [id]);
    
    return NextResponse.json({ appointments, invoices });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch patient data" }, { status: 500 });
  }
}
