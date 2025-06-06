// app/api/public/properties/route.ts
import { NextResponse } from "next/server";
import Property from "@/models/property.model";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const approvedProperties = await Property.find({
      verified: true,
    }).populate("postedBy", "firstname lastname");

    return NextResponse.json({ properties: approvedProperties });
  } catch (error) {
    console.error("Failed to fetch public properties", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
