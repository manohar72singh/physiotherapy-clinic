import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {

  const resolvedParams = await params;
  const id = resolvedParams.id;
  const body = await request.json();
  const { status } = body;

  try {
    await db.query("UPDATE contact_messages SET status = ? WHERE id = ?", [status, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }

}

