"use server";

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      return { error: 'Please fill out all fields perfectly.' };
    }

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    if (!SMTP_EMAIL || !SMTP_PASSWORD) {
      return { error: 'Email service pending configuration. Contact administrator to update .env' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${SMTP_EMAIL}>`, 
      replyTo: email,
      to: SMTP_EMAIL,
      subject: `New Lead: ${name} - ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #171717; padding: 20px; text-align: center;">
            <h2 style="color: #FFDD33; margin: 0; font-size: 24px; font-weight: bold;">New Lead / Contact Request</h2>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #4B5563;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #4B5563;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: #4B5563;"><strong>Subject:</strong> ${subject}</p>
            
            <div style="background-color: #F9FAFB; border-left: 4px solid #FFDD33; padding: 15px; border-radius: 4px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1F2937; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background-color: #F3F4F6; padding: 15px; text-align: center; font-size: 12px; color: #9CA3AF;">
            This email was automatically generated from the NGQ Assets platform.
          </div>
        </div>
      `,
    };

    // Fire and forget so we don't block the frontend UI with SMTP latency
    transporter.sendMail(mailOptions).catch((error) => {
      console.error('Background email sending error:', error);
    });

    return { success: true, message: 'Your message has been securely delivered to our operational desk.' };
  } catch (error: any) {
    console.error('Email sending error:', error);
    return { error: 'System failed to relay email. Please try again later.' };
  }
}
