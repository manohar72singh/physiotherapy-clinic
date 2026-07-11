import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {

  const resolvedParams = await params;
  const id = resolvedParams.id;
  const body = await request.json();
  const { status } = body;

  try {
    await db.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id]);
    
    if (status === "Completed") {
      await db.query("UPDATE invoices SET status = 'Paid' WHERE appointmentId = ?", [id]);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }

}

