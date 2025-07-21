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

// Register Handlebars helpers
handlebars.registerHelper('gt', function(a: number, b: number) {
  return a > b;
});

handlebars.registerHelper('eq', function(a: any, b: any) {
  return a === b;
});

handlebars.registerHelper('or', function(...args: any[]) {
  // Remove the last argument which is the options object
  const values = args.slice(0, -1);
  return values.some(val => !!val);
});

handlebars.registerHelper('and', function(...args: any[]) {
  // Remove the last argument which is the options object
  const values = args.slice(0, -1);
  return values.every(val => !!val);
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
      logoUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://hoodhub.ru'}/logo.png`,
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
 * Send booking confirmation email - Updated for multiple services
 */
export async function sendBookingConfirmationEmail(
  to: string,
  bookingDetails: {
    firstName: string;
    service: string; // This can now be comma-separated services
    services?: Array<{id: string, name: string}>; // Optional: structured services array
    date: string;
    time: string;
    artist?: string;
    location?: string;
    comment?: string | null;
  }
): Promise<boolean> {
  // Handle both service string and services array
  let serviceText = '';
  let serviceCount = 1;
  
  if (bookingDetails.services && Array.isArray(bookingDetails.services)) {
    serviceText = bookingDetails.services.map(s => s.name).join(', ');
    serviceCount = bookingDetails.services.length;
  } else {
    serviceText = bookingDetails.service;
    serviceCount = bookingDetails.service.split(',').length;
  }

  // Create service display text
  const serviceDisplay = serviceCount > 1 
    ? `<strong>Services:</strong> ${serviceText}`
    : `<strong>Service:</strong> ${serviceText}`;

  // Add comment if provided
  const commentDisplay = bookingDetails.comment 
    ? `<br><br><strong>Special Requests:</strong> ${bookingDetails.comment}`
    : '';

  return sendEmail({
    to,
    subject: `Booking Confirmed - ${serviceCount > 1 ? 'Multiple Services' : serviceText} - HoodHub`,
    emailType: EmailType.BOOKING_CONFIRMATION,
    templateData: {
      title: 'Booking Confirmed!',
      message: `Hi ${bookingDetails.firstName}!<br><br>Your appointment${serviceCount > 1 ? 's' : ''} ${serviceCount > 1 ? 'have' : 'has'} been confirmed. Here are the details:`,
      bookingDetails: {
        service: serviceText,
        services: bookingDetails.services || null,
        date: bookingDetails.date,
        time: bookingDetails.time,
        artist: bookingDetails.artist || 'Our skilled team',
        location: bookingDetails.location || 'HoodHub Studio',
        serviceDisplay: serviceDisplay,
        comment: bookingDetails.comment,
        commentDisplay: commentDisplay,
        serviceCount: serviceCount,
        multipleServices: serviceCount > 1
      },
      buttonText: 'View My Bookings',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
      isBooking: true
    }
  });
}

/**
 * Send booking reminder email - Updated for multiple services
 */
export async function sendBookingReminderEmail(
  to: string,
  reminderDetails: {
    firstName: string;
    service: string; // Can be comma-separated
    services?: Array<{id: string, name: string}>;
    date: string;
    time: string;
    artist?: string;
  }
): Promise<boolean> {
  let serviceText = '';
  let serviceCount = 1;
  
  if (reminderDetails.services && Array.isArray(reminderDetails.services)) {
    serviceText = reminderDetails.services.map(s => s.name).join(', ');
    serviceCount = reminderDetails.services.length;
  } else {
    serviceText = reminderDetails.service;
    serviceCount = reminderDetails.service.split(',').length;
  }

  return sendEmail({
    to,
    subject: `Appointment Reminder - Tomorrow at HoodHub`,
    emailType: EmailType.BOOKING_REMINDER,
    templateData: {
      title: 'Appointment Reminder',
      message: `Hi ${reminderDetails.firstName}!<br><br>This is a friendly reminder about your upcoming appointment${serviceCount > 1 ? 's' : ''} tomorrow:`,
      bookingDetails: {
        ...reminderDetails,
        service: serviceText,
        serviceCount: serviceCount,
        multipleServices: serviceCount > 1
      },
      buttonText: 'Get Directions',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      isReminder: true
    }
  });
}

/**
 * Send booking cancellation email - Updated for multiple services
 */
export async function sendBookingCancellationEmail(
  to: string,
  cancellationDetails: {
    firstName: string;
    service: string; // Can be comma-separated
    services?: Array<{id: string, name: string}>;
    date: string;
    time: string;
  }
): Promise<boolean> {
  let serviceText = '';
  let serviceCount = 1;
  
  if (cancellationDetails.services && Array.isArray(cancellationDetails.services)) {
    serviceText = cancellationDetails.services.map(s => s.name).join(', ');
    serviceCount = cancellationDetails.services.length;
  } else {
    serviceText = cancellationDetails.service;
    serviceCount = cancellationDetails.service.split(',').length;
  }

  return sendEmail({
    to,
    subject: `Booking Cancelled - ${serviceCount > 1 ? 'Multiple Services' : serviceText} - HoodHub`,
    emailType: EmailType.BOOKING_CANCELLATION,
    templateData: {
      title: 'Booking Cancelled',
      message: `Hi ${cancellationDetails.firstName}!<br><br>Your appointment${serviceCount > 1 ? 's' : ''} ${serviceCount > 1 ? 'have' : 'has'} been cancelled as requested:`,
      bookingDetails: {
        ...cancellationDetails,
        service: serviceText,
        serviceCount: serviceCount,
        multipleServices: serviceCount > 1
      },
      buttonText: 'Book New Appointment',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
      isCancellation: true
    }
  });
}

/**
 * Send admin notification for new booking - Updated for multiple services
 */
export async function sendAdminBookingNotification(
  bookingDetails: {
    customerName: string;
    customerEmail: string;
    service: string; // Can be comma-separated
    services?: Array<{id: string, name: string}>;
    date: string;
    time: string;
    bookingId: string;
    comment?: string | null;
    referralCode?: string | null;
    referralUserEmail?: string | null;
  }
): Promise<boolean> {
  // Handle both service string and services array
  let serviceText = '';
  let serviceCount = 1;
  
  if (bookingDetails.services && Array.isArray(bookingDetails.services)) {
    serviceText = bookingDetails.services.map(s => s.name).join(', ');
    serviceCount = bookingDetails.services.length;
  } else {
    serviceText = bookingDetails.service;
    serviceCount = bookingDetails.service.split(',').length;
  }

  // Build referral message if referral exists
  let referralMessage = '';
  if (bookingDetails.referralCode && bookingDetails.referralUserEmail) {
    referralMessage = `<br><br><strong>🎁 Referral Information:</strong><br>
    • Referral Code: <code>${bookingDetails.referralCode}</code><br>
    • Referred by: ${bookingDetails.referralUserEmail}`;
  }

  // Add comment if provided
  let commentMessage = '';
  if (bookingDetails.comment) {
    commentMessage = `<br><br><strong>💬 Special Requests:</strong><br>${bookingDetails.comment}`;
  }

  return sendEmail({
    to: 'contact@hoodhub.ru',
    subject: `New Booking Alert - ${serviceCount > 1 ? `${serviceCount} Services` : serviceText}`,
    emailType: EmailType.ADMIN_BOOKING_NOTIFICATION,
    templateData: {
      title: '🎯 New Booking Alert!',
      message: `A new appointment with ${serviceCount > 1 ? 'multiple services' : 'service'} has been booked on the platform. Here are the details:`,
      bookingDetails: {
        service: serviceText,
        services: bookingDetails.services || null,
        date: bookingDetails.date,
        time: bookingDetails.time,
        customer: bookingDetails.customerName,
        email: bookingDetails.customerEmail,
        bookingId: bookingDetails.bookingId,
        referralCode: bookingDetails.referralCode,
        referralUserEmail: bookingDetails.referralUserEmail,
        comment: bookingDetails.comment,
        serviceCount: serviceCount,
        multipleServices: serviceCount > 1
      },
      buttonText: 'View All Bookings',
      buttonUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings`,
      isAdminNotification: true,
      customerDetails: {
        name: bookingDetails.customerName,
        email: bookingDetails.customerEmail
      },
      referralDetails: bookingDetails.referralCode ? {
        code: bookingDetails.referralCode,
        userEmail: bookingDetails.referralUserEmail
      } : null
    }
  });
}

/**
 * Send admin notification for booking cancellation - Updated for multiple services
 */
export async function sendAdminCancellationNotification(
  cancellationDetails: {
    customerName: string;
    customerEmail: string;
    service: string; // Can be comma-separated
    services?: Array<{id: string, name: string}>;
    date: string;
    time: string;
    bookingId: string;
  }
): Promise<boolean> {
  let serviceText = '';
  let serviceCount = 1;
  
  if (cancellationDetails.services && Array.isArray(cancellationDetails.services)) {
    serviceText = cancellationDetails.services.map(s => s.name).join(', ');
    serviceCount = cancellationDetails.services.length;
  } else {
    serviceText = cancellationDetails.service;
    serviceCount = cancellationDetails.service.split(',').length;
  }

  return sendEmail({
    to: 'contact@hoodhub.ru',
    subject: `Booking Cancelled - ${serviceCount > 1 ? `${serviceCount} Services` : serviceText}`,
    emailType: EmailType.ADMIN_CANCELLATION_NOTIFICATION,
    templateData: {
      title: '❌ Booking Cancellation Alert',
      message: `An appointment with ${serviceCount > 1 ? 'multiple services' : 'service'} has been cancelled. Here are the details:`,
      bookingDetails: {
        service: serviceText,
        services: cancellationDetails.services || null,
        date: cancellationDetails.date,
        time: cancellationDetails.time,
        customer: cancellationDetails.customerName,
        email: cancellationDetails.customerEmail,
        bookingId: cancellationDetails.bookingId,
        serviceCount: serviceCount,
        multipleServices: serviceCount > 1
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
      buttonUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://hoodhub.ru',
      isCustom: true
    }
  });
}