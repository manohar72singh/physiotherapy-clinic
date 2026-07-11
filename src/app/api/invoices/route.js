import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {

  try {
    const [invoices] = await db.query("SELECT * FROM invoices ORDER BY id DESC");
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

