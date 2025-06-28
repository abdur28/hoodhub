// lib/email.ts
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD 
  }
});

// Email types
export enum EmailType {
  REGISTRATION = 'registration',
  BOOKING_CONFIRMATION = 'booking_confirmation',
  BOOKING_REMINDER = 'booking_reminder',
  BOOKING_CANCELLATION = 'booking_cancellation',
  ADMIN_CUSTOM = 'admin_custom',
  ADMIN_BOOKING_NOTIFICATION = 'admin_booking_notification',
  ADMIN_CANCELLATION_NOTIFICATION = 'admin_cancellation_notification',
  PASSWORD_RESET = 'password_reset'
}

interface EmailOptions {
  to: string;
  subject: string;
  templateData?: Record<string, any>;
  emailType: EmailType;
}

/**
 * Get compiled email template with data
 */
function getCompiledTemplate(templateData: Record<string, any>) {
  try {
    const templatePath = path.join(process.cwd(), 'emails', 'index.html');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateContent);
    return template(templateData);
  } catch (error) {
    console.error(`Template error: ${error}`);
    // Fallback HTML
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>${templateData.title || 'HoodHub Notification'}</h2>
        <p>${templateData.message || ''}</p>
        <p>Best regards,<br>The HoodHub Team</p>
      </div>
    `;
  }
}

/**
 * Send email with template
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Default template data
    const templateData = {
      title: options.subject,
      message: 'Thank you for choosing HoodHub.',
      currentYear: new Date().getFullYear(),
      companyName: 'HoodHub',
      websiteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://hoodhub.ru',
      logoUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://hoodhub.ru'}/api/logo`,
      ...options.templateData
    };

    const html = getCompiledTemplate(templateData);
    
    // Development mode - log instead of sending
    if (process.env.NODE_ENV === 'development' && process.env.EMAIL_DEBUG === 'true') {
      console.log('-------- EMAIL DEBUG --------');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Type: ${options.emailType}`);
      console.log(`HTML: ${html}`);
      return true;
    }
    
    // Send email
    await transporter.sendMail({
      from: `"HoodHub" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: html,
      headers: {
        'X-Email-Type': options.emailType
      }
    });
    
    console.log(`Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

/**
 * Send registration welcome email
 */
export async function sendRegistrationEmail(
  to: string,
  firstName: string
): Promise<boolean> {
  return sendEmail({
    to,
    subject: 'Welcome to HoodHub - Your Journey Begins!',
    emailType: EmailType.REGISTRATION,
    templateData: {
      title: 'Welcome to HoodHub!',
      message: `Hi ${firstName}!<br><br>Welcome to the HoodHub family! We're thrilled to have you join our community of style enthusiasts.<br><br>You can now book appointments for our premium services including barbering, tattoo artistry, and lifestyle experiences.`,
      buttonText: 'Book Your First Appointment',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
      isWelcome: true
    }
  });
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(
  to: string,
  bookingDetails: {
    firstName: string;
    service: string;
    date: string;
    time: string;
    artist?: string;
    location?: string;
  }
): Promise<boolean> {
  return sendEmail({
    to,
    subject: 'Booking Confirmed - HoodHub',
    emailType: EmailType.BOOKING_CONFIRMATION,
    templateData: {
      title: 'Booking Confirmed!',
      message: `Hi ${bookingDetails.firstName}!<br><br>Your appointment has been confirmed. Here are the details:`,
      bookingDetails: {
        service: bookingDetails.service,
        date: bookingDetails.date,
        time: bookingDetails.time,
        artist: bookingDetails.artist || 'Our skilled team',
        location: bookingDetails.location || 'HoodHub Studio'
      },
      buttonText: 'View My Bookings',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
      isBooking: true
    }
  });
}

/**
 * Send booking reminder email
 */
export async function sendBookingReminderEmail(
  to: string,
  reminderDetails: {
    firstName: string;
    service: string;
    date: string;
    time: string;
    artist?: string;
  }
): Promise<boolean> {
  return sendEmail({
    to,
    subject: 'Appointment Reminder - Tomorrow at HoodHub',
    emailType: EmailType.BOOKING_REMINDER,
    templateData: {
      title: 'Appointment Reminder',
      message: `Hi ${reminderDetails.firstName}!<br><br>This is a friendly reminder about your upcoming appointment tomorrow:`,
      bookingDetails: reminderDetails,
      buttonText: 'Get Directions',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      isReminder: true
    }
  });
}

/**
 * Send booking cancellation email
 */
export async function sendBookingCancellationEmail(
  to: string,
  cancellationDetails: {
    firstName: string;
    service: string;
    date: string;
    time: string;
  }
): Promise<boolean> {
  return sendEmail({
    to,
    subject: 'Booking Cancelled - HoodHub',
    emailType: EmailType.BOOKING_CANCELLATION,
    templateData: {
      title: 'Booking Cancelled',
      message: `Hi ${cancellationDetails.firstName}!<br><br>Your appointment has been cancelled as requested:`,
      bookingDetails: cancellationDetails,
      buttonText: 'Book New Appointment',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
      isCancellation: true
    }
  });
}

/**
 * Send admin notification for new booking
 */
export async function sendAdminBookingNotification(
  bookingDetails: {
    customerName: string;
    customerEmail: string;
    service: string;
    date: string;
    time: string;
    bookingId: string;
  }
): Promise<boolean> {
  return sendEmail({
    to: 'contact@hoodhub.ru',
    subject: `New Booking Alert - ${bookingDetails.service}`,
    emailType: EmailType.ADMIN_BOOKING_NOTIFICATION,
    templateData: {
      title: '🎯 New Booking Alert!',
      message: `A new appointment has been booked on the platform. Here are the details:`,
      bookingDetails: {
        service: bookingDetails.service,
        date: bookingDetails.date,
        time: bookingDetails.time,
        customer: bookingDetails.customerName,
        email: bookingDetails.customerEmail,
        bookingId: bookingDetails.bookingId
      },
      buttonText: 'View All Bookings',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings`,
      isAdminNotification: true,
      customerDetails: {
        name: bookingDetails.customerName,
        email: bookingDetails.customerEmail
      }
    }
  });
}

/**
 * Send admin notification for booking cancellation
 */
export async function sendAdminCancellationNotification(
  cancellationDetails: {
    customerName: string;
    customerEmail: string;
    service: string;
    date: string;
    time: string;
    bookingId: string;
  }
): Promise<boolean> {
  return sendEmail({
    to: 'contact@hoodhub.ru',
    subject: `Booking Cancelled - ${cancellationDetails.service}`,
    emailType: EmailType.ADMIN_CANCELLATION_NOTIFICATION,
    templateData: {
      title: '❌ Booking Cancellation Alert',
      message: `An appointment has been cancelled. Here are the details:`,
      bookingDetails: {
        service: cancellationDetails.service,
        date: cancellationDetails.date,
        time: cancellationDetails.time,
        customer: cancellationDetails.customerName,
        email: cancellationDetails.customerEmail,
        bookingId: cancellationDetails.bookingId
      },
      buttonText: 'View All Bookings',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings`,
      isCancellation: true,
      isAdminNotification: true,
      customerDetails: {
        name: cancellationDetails.customerName,
        email: cancellationDetails.customerEmail
      }
    }
  });
}

/**
 * Send custom admin email
 */
export async function sendAdminCustomEmail(
  to: string,
  subject: string,
  message: string,
  firstName?: string
): Promise<boolean> {
  return sendEmail({
    to,
    subject,
    emailType: EmailType.ADMIN_CUSTOM,
    templateData: {
      title: subject,
      message: firstName ? `Hi ${firstName}!<br><br>${message}` : message,
      buttonText: 'Visit HoodHub',
      buttonUrl: process.env.NEXT_PUBLIC_BASE_URL,
      isCustom: true
    }
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  firstName?: string
): Promise<boolean> {
  return sendEmail({
    to,
    subject: 'Reset Your HoodHub Password',
    emailType: EmailType.PASSWORD_RESET,
    templateData: {
      title: 'Password Reset Request',
      message: firstName 
        ? `Hi ${firstName}!<br><br>We received a request to reset your password. Click the button below to create a new password:`
        : 'We received a request to reset your password. Click the button below to create a new password:',
      buttonText: 'Reset Password',
      buttonUrl: resetUrl,
      isPasswordReset: true,
      resetNote: 'If you didn\'t request this, you can safely ignore this email. The link will expire in 24 hours.'
    }
  });
}