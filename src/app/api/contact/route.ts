import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Email to website owner (notification)
    const notificationEmailHtml = `
      <!DOCTYPE html> <html> <head> <meta charset="utf-8"> <title>New Contact Message</title> </head> <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);"> <thead> <tr> <td style="padding: 32px 24px 24px; text-align: center; background-color: #1e40af; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;"> <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Contact Message</h1> </td> </tr> </thead> <tbody> <tr> <td style="padding: 24px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding-bottom: 16px;"> <p style="margin: 0; font-size: 16px; color: #1f2937;"><strong>Name:</strong> ${name}</p> </td> </tr> <tr> <td style="padding-bottom: 16px;"> <p style="margin: 0; font-size: 16px; color: #1f2937;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e40af; text-decoration: none;">${email}</a></p> </td> </tr> <tr> <td style="padding-bottom: 16px;"> <p style="margin: 0; font-size: 16px; color: #1f2937;"><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}" style="color: #1e40af; text-decoration: none;">${phone}</a>` : "<span style='color: #6b7280;'>N/A</span>"}</p> </td> </tr> <tr> <td style="padding-bottom: 16px;"> <p style="margin: 0; font-size: 16px; color: #1f2937;"><strong>Company:</strong> ${company ? company : "<span style='color: #6b7280;'>N/A</span>"}</p> </td> </tr> <tr> <td style="padding-top: 16px; border-top: 1px solid #e5e7eb;"> <p style="margin: 0 0 8px; font-size: 16px; color: #1f2937;"><strong>Message:</strong></p> <div style="font-size: 15px; line-height: 1.5; color: #374151; white-space: pre-wrap;">${message}</div> </td> </tr> </table> </td> </tr> </tbody> <tfoot> <tr> <td style="padding: 20px 24px; text-align: center; font-size: 13px; color: #6b7280; background-color: #f3f4f6; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"> This message was sent from your website contact form. </td> </tr> </tfoot> </table> </body> </html>
    `;

    // Confirmation email to sender (thank you)
    const confirmationEmailHtml = `
      <!DOCTYPE html> <html> <head> <meta charset="utf-8"> <title>Thank You for Contacting Us</title> </head> <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);"> <thead> <tr> <td style="padding: 32px 24px 24px; text-align: center; background-color: #1e40af; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;"> <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Thank You for Reaching Out! 🚀</h1> </td> </tr> </thead> <tbody> <tr> <td style="padding: 32px 24px;"> <p style="margin: 0 0 16px; font-size: 16px; color: #1f2937;">Hi ${name},</p> <p style="margin: 0 0 16px; font-size: 16px; color: #1f2937; line-height: 1.6;">Thank you for contacting me! I've received your message and I'm excited to connect with you.</p> <p style="margin: 0 0 16px; font-size: 16px; color: #1f2937; line-height: 1.6;">I'll review your inquiry and get back to you as soon as possible, typically within 24-48 hours.</p> <div style="margin: 24px 0; padding: 20px; background-color: #f3f4f6; border-left: 4px solid #1e40af; border-radius: 4px;"> <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280; font-weight: 600;">YOUR MESSAGE:</p> <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5; white-space: pre-wrap;">${message}</p> </div> <p style="margin: 24px 0 0; font-size: 16px; color: #1f2937;">Best regards,<br><strong>Khalid Mahmood</strong></p> </td> </tr> </tbody> <tfoot> <tr> <td style="padding: 20px 24px; text-align: center; background-color: #f3f4f6; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"> <p style="margin: 0 0 8px; font-size: 14px; color: #1f2937; font-weight: 500;">Connect with me</p> <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;"> <tr> <td style="padding: 0 8px;"> <a href="tel:+923363216666" style="color: #1e40af; text-decoration: none; font-size: 13px;">📞 +92 336 3216666</a> </td> <td style="padding: 0 8px; color: #d1d5db;">|</td> <td style="padding: 0 8px;"> <a href="mailto:hello@bestkhalid.com" style="color: #1e40af; text-decoration: none; font-size: 13px;">✉️ hello@bestkhalid.com</a> </td> </tr> </table> <p style="margin: 12px 0 0; font-size: 12px; color: #9ca3af;">This is an automated confirmation email. Please do not reply to this message.</p> </td> </tr> </tfoot> </table> </body> </html>
    `;

    // Send both emails
    await Promise.all([
      // Email to website owner
      resend.emails.send({
        from: `Website Contact <${process.env.FROM_EMAIL}>`,
        to: process.env.CONTACT_RECEIVER!,
        replyTo: email,
        subject: `📩 New Contact Message from ${name}`,
        html: notificationEmailHtml,
      }),
      // Confirmation email to sender
      resend.emails.send({
        from: `Khalid Mahmood <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}!`,
        html: confirmationEmailHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}