import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Path to your logo in the public folder
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    
    // Check if file exists
    if (!fs.existsSync(logoPath)) {
      return new NextResponse('Logo not found', { status: 404 });
    }
    
    // Read the file
    const logoBuffer = fs.readFileSync(logoPath);
    
    // Return the image with proper headers
    return new NextResponse(logoBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error serving logo:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}