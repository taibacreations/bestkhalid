import { NextResponse } from "next/server";
import { Resend } from "resend";
// Import Brevo with correct destructure per SDK documentation
import * as Brevo from "@getbrevo/brevo";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Correct Brevo API setup
// Instead of `new Brevo()`, use the specific API classes and .setApiKey on each as needed
const brevoContactsApi = new Brevo.ContactsApi();
const brevoEmailsApi = new Brevo.TransactionalEmailsApi();

if (process.env.BREVO_API_KEY) {
  // Set API Key for Contacts & Emails API as required
  brevoContactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  brevoEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
}

// Replace with your Brevo list ID
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "0", 10);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message } = body;

    // Validation with detailed error
    if (!name || !email || !message) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!message) missingFields.push("message");
      
      console.error("Missing fields:", missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // -------------------------------
    // HTML: Owner Notification
    // -------------------------------
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Contact Message</title></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f9fafb;">
        <table role="presentation" width="100%" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;">
          <thead>
            <tr><td style="padding:32px 24px;text-align:center;background:#1e40af;color:white;border-top-left-radius:8px;border-top-right-radius:8px;"><h1>New Contact Message</h1></td></tr>
          </thead>
          <tbody>
            <tr><td style="padding:24px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${phone || "N/A"}</p>
              <p><strong>Company:</strong> ${company || "N/A"}</p>
              <hr style="margin:20px 0;">
              <p><strong>Message:</strong></p>
              <div style="white-space:pre-wrap;">${message}</div>
            </td></tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

    // -------------------------------
    // HTML: Confirmation Email
    // -------------------------------
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Thank You</title></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f9fafb;">
        <table role="presentation" width="100%" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;">
          <thead>
            <tr><td style="padding:32px 24px;text-align:center;background:#1e40af;color:white;border-top-left-radius:8px;border-top-right-radius:8px;"><h1>Thank You for Reaching Out 🚀</h1></td></tr>
          </thead>
          <tbody>
            <tr><td style="padding:24px;">
              <p>Hi ${name},</p>
              <p>Thank you for contacting me. I've received your message and will respond within 24–48 hours.</p>
              <hr style="margin:20px 0;">
              <p><strong>Your Message:</strong></p>
              <div style="white-space:pre-wrap;">${message}</div>
              <p style="margin-top:30px;">Best regards,<br><strong>Khalid Mahmood</strong></p>
            </td></tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

    const errors: string[] = [];

    // -------------------------------
    // Add Contact to Brevo List (Optional - don't fail if this fails)
    // -------------------------------
    try {
      if (process.env.BREVO_API_KEY && BREVO_LIST_ID) {
        await brevoContactsApi.createContact({
          email,
          listIds: [BREVO_LIST_ID],
          attributes: {
            FIRSTNAME: name.split(" ")[0] || "",
            LASTNAME: name.split(" ").slice(1).join(" ") || "",
          },
          updateEnabled: true,
        });
        console.log("✅ Contact added to Brevo list");
      }
    } catch (brevoError) {
      console.warn("⚠️ Failed to add contact to Brevo:", brevoError);
      errors.push("Brevo contact sync failed");
      // Don't throw - continue with email sending
    }

    // -------------------------------
    // Send Owner Notifications
    // -------------------------------
    const emailPromises: Promise<any>[] = [];

    // Resend (Primary)
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL && process.env.CONTACT_RECEIVER) {
      emailPromises.push(
        resend.emails.send({
          from: `Website Contact <${process.env.FROM_EMAIL}>`,
          to: process.env.CONTACT_RECEIVER,
          replyTo: email,
          subject: `📩 New Contact Message from ${name}`,
          html: notificationEmailHtml,
        }).then(() => console.log("✅ Resend owner notification sent"))
      );
    }

    // Brevo (Secondary)
    if (process.env.BREVO_API_KEY && process.env.FROM_EMAIL && process.env.CONTACT_RECEIVER) {
      emailPromises.push(
        brevoEmailsApi.sendTransacEmail({
          sender: {
            name: "Website Contact",
            email: process.env.FROM_EMAIL,
          },
          to: [{ email: process.env.CONTACT_RECEIVER }],
          replyTo: { email, name },
          subject: `📩 New Contact Message from ${name}`,
          htmlContent: notificationEmailHtml,
        }).then(() => console.log("✅ Brevo owner notification sent"))
      );
    }

    // Confirmation email to sender (Resend only)
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
      emailPromises.push(
        resend.emails.send({
          from: `Khalid Mahmood <${process.env.FROM_EMAIL}>`,
          to: email,
          subject: `Thank you for reaching out, ${name}!`,
          html: confirmationEmailHtml,
        }).then(() => console.log("✅ Confirmation email sent"))
      );
    }

    // Execute all email promises
    if (emailPromises.length > 0) {
      await Promise.all(emailPromises);
    } else {
      console.error("❌ No email service configured!");
      return NextResponse.json(
        { error: "Email service not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    console.log("✅ All emails sent successfully");
    return NextResponse.json({ 
      success: true,
      message: "Message sent successfully"
    });

  } catch (error: any) {
    console.error("❌ Contact form error:", error);
    
    // Provide more detailed error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        error: "Failed to send message",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}