import { NextResponse } from "next/server";
import { saveAcademyLead } from "@/lib/academy-sheet";

export const runtime = "nodejs";

function text(value: unknown, max = 200) {
  return String(value || "").trim().slice(0, max);
}

function digits(value: unknown) {
  let mobile = String(value || "").replace(/\D/g, "");
  if (mobile.length === 12 && mobile.startsWith("91")) mobile = mobile.slice(2);
  else if (mobile.length === 11 && mobile.startsWith("0")) mobile = mobile.slice(1);
  return mobile;
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const leadType = body.leadType === "Academy" ? "Academy" : "Player";
  const academyName = text(body.academyName);
  const contactPerson = text(body.contactPerson);
  const mobile = digits(body.mobile);

  if (!academyName || !contactPerson || !/^\d{10}$/.test(mobile)) {
    return NextResponse.json(
      { error: "Name, academy, and a valid mobile number are required" },
      { status: 400 },
    );
  }

  try {
    await saveAcademyLead({
      leadType,
      playerName: text(body.playerName) || (leadType === "Player" ? contactPerson : ""),
      age: text(body.age, 10),
      coach: text(body.coach),
      academyName,
      sports: text(body.sports),
      contactPerson,
      mobile,
      email: text(body.email),
      athletes: text(body.athletes, 20),
      location: text(body.location),
      notes: text(body.notes, 500),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Academy lead save failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Could not save the lead" }, { status: 500 });
  }
}
