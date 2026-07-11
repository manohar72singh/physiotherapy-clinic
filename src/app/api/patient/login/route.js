import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request, { params }) {

  const body = await request.json();
  const { email, password } = body;
  try {
    const [patients] = await db.query("SELECT * FROM patients WHERE email = ?", [email.toLowerCase()]);
    const patient = patients[0];
    if (!patient) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    
    const match = await bcrypt.compare(password, patient.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Hide password from response
    delete patient.password;
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }

}

