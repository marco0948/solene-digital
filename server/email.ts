import nodemailer from "nodemailer";

// Create a transporter using Gmail or your email service
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "mronquillo799@gmail.com",
    pass: process.env.SMTP_PASSWORD?.trim().replace(/\s+/g, '') || "",
  },
});

console.log("Email transporter configured with:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  hasPassword: !!process.env.SMTP_PASSWORD,
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "mronquillo799@gmail.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

export async function sendContactNotification(
  clientEmail: string,
  clientName: string,
  clientMessage: string
): Promise<void> {
  // Email to admin/owner
  const adminEmailHtml = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${clientName}</p>
    <p><strong>Email:</strong> ${clientEmail}</p>
    <p><strong>Message:</strong></p>
    <p>${clientMessage.replace(/\n/g, "<br>")}</p>
    <hr>
    <p>Log in to your dashboard to respond to this inquiry.</p>
  `;

  // Email to client (confirmation)
  const clientEmailHtml = `
    <h2>Thank You for Contacting Solène Digital</h2>
    <p>Hi ${clientName},</p>
    <p>We've received your message and appreciate you reaching out. Our team will get back to you within 24 hours.</p>
    <p><strong>Your message:</strong></p>
    <p>${clientMessage.replace(/\n/g, "<br>")}</p>
    <hr>
    <p>Best regards,<br>Solène Digital Team</p>
  `;

  // Send to admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL || "mronquillo799@gmail.com",
    subject: `New Contact Submission from ${clientName}`,
    html: adminEmailHtml,
  });

  // Send confirmation to client
  await sendEmail({
    to: clientEmail,
    subject: "We've received your message - Solène Digital",
    html: clientEmailHtml,
  });
}
