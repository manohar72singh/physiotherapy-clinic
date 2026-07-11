import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {

  try {
    const [messages] = await db.query("SELECT * FROM contact_messages ORDER BY createdAt DESC");
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

export async function POST(request, { params }) {

  const body = await request.json();
  const { firstName, lastName, email, inquiryType, message } = body;

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const id = `MSG-${Math.floor(100 + Math.random() * 900)}`;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await db.query(`
      INSERT INTO contact_messages (id, firstName, lastName, email, inquiryType, message, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, firstName, lastName, email, inquiryType || "General Inquiry", message, "Unread", createdAt]);
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }

}

