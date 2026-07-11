import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {

  try {
    const [[{ todayAdmissions }]] = await db.query("SELECT COUNT(*) as todayAdmissions FROM appointments WHERE status != 'Cancelled'");
    const [[{ activePatients }]] = await db.query("SELECT COUNT(*) as activePatients FROM patients");
    const [[{ totalRevenue }]] = await db.query("SELECT SUM(amount) as totalRevenue FROM invoices WHERE status = 'Paid'");

    return NextResponse.json({
      todayAdmissions,
      activePatients,
      totalRevenue: totalRevenue || 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

