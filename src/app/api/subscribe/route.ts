// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 🔹 TODO: Forward to gamma@sbcglobal.net or save to Airtable
    // For now, just log (you can extend this later)
    console.log('New subscription:', email);

    // Example: You could call Airtable or SendGrid here

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}