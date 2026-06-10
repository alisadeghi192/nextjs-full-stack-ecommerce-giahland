import { seedProducts } from "@/lib/seed/seedProduct";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seedProducts();
    return NextResponse.json({ message: "Seeding completed successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}