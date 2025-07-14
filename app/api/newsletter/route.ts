// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { sendAdminCustomEmail } from "@/lib/email";

// POST: Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Check if email already subscribed
    const existingSubscriber = await db.collection("subscribers").findOne({
      email: email.trim().toLowerCase()
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email is already subscribed to our newsletter" },
        { status: 409 }
      );
    }

    // Add subscriber to database
    const subscriberData = {
      email: email.trim().toLowerCase(),
      subscribedAt: new Date(),
      status: 'active'
    };

    await db.collection("subscribers").insertOne(subscriberData);

    // Send welcome email to subscriber
    try {
      await sendAdminCustomEmail(
        email.trim(),
        'Welcome to HoodHub Newsletter!',
        `
          <h2>Welcome to the HoodHub Community! 🎉</h2>
          
          <p>Thank you for subscribing to our newsletter. You're now part of an exclusive community that stays ahead of the latest trends in style, grooming, and lifestyle.</p>
          
          <p><strong>What to expect:</strong></p>
          <ul>
            <li>🎨 Exclusive style tips and trends</li>
            <li>💄 Expert grooming advice</li>
            <li>🎁 Special offers and promotions</li>
            <li>📅 Early access to new services</li>
            <li>✨ Behind-the-scenes content</li>
          </ul>
          
          <p>We promise to keep your inbox valuable and never spam you. You can unsubscribe at any time.</p>
          
          <p>Welcome aboard!</p>
          <p><strong>The HoodHub Team</strong></p>
        `,
        undefined // No specific first name
      );
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }
    
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter! Check your email for a welcome message."
    });

  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}