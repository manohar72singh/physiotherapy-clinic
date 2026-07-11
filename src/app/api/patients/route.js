import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {

  try {
    const [patients] = await db.query("SELECT id, name, email, phone, condition_desc, lastVisit, totalAppointments FROM patients");
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

