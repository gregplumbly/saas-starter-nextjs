import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { contacts } from '@/lib/db/schema';
import { z } from 'zod';

// Define validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the input
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Insert the contact message into the database
    const newContact = await db.insert(contacts).values({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject || "Contact Form Submission",
      message: result.data.message,
      isRead: false,
    }).returning();
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon." 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error submitting contact form:", error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: "Something went wrong while submitting your message. Please try again later." 
      },
      { status: 500 }
    );
  }
}
