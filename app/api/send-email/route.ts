// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendAdminCustomEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Format the message for the admin email
    const formattedMessage = `
      <strong>New Contact Form Submission</strong><br><br>
      
      <strong>Customer Details:</strong><br>
      • Name: ${name}<br>
      • Email: ${email}<br>
      ${phone ? `• Phone: ${phone}<br>` : ''}
      ${service ? `• Service Interest: ${service}<br>` : ''}<br>
      
      <strong>Message:</strong><br>
      ${message.replace(/\n/g, '<br>')}<br><br>
      
      <em>This message was sent from the HoodHub contact form.</em>
    `;

    // Send email to admin
    const emailSent = await sendAdminCustomEmail(
      'contact@hoodhub.ru',
      `New Contact Form Submission from ${name}`,
      formattedMessage,
      undefined // No firstName for admin email
    );

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Optionally send a confirmation email to the customer
    try {
      await sendAdminCustomEmail(
        email,
        'Thank you for contacting HoodHub',
        `
          Hi ${name}!<br><br>
          
          Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.<br><br>
          
          <strong>Your message:</strong><br>
          ${message.replace(/\n/g, '<br>')}<br><br>
          
          In the meantime, feel free to browse our services or book an appointment directly through our website.<br><br>
          
          Best regards,<br>
          The HoodHub Team
        `,
        name
      );
    } catch (confirmationError) {
      console.warn('Failed to send confirmation email to customer:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully! We\'ll get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}