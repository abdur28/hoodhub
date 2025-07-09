// app/api/referral/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

// GET: Validate referral code
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Find user with this referral code
    const user = await db.collection("users").findOne({ 
      referralCode: code.toUpperCase() 
    });

    if (!user) {
      return NextResponse.json({
        valid: false,
        message: "Invalid referral code"
      });
    }

    return NextResponse.json({
      valid: true,
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      message: "Valid referral code"
    });

  } catch (error) {
    console.error("Error validating referral code:", error);
    return NextResponse.json(
      { error: "Failed to validate referral code" },
      { status: 500 }
    );
  }
}