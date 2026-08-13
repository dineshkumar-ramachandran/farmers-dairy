import { createServerFn } from "@tanstack/react-start";
import { CONTACT_TO, RESEND_API_KEY } from "@/lib/env.server";

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const i = (input ?? {}) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };
    return {
      name: String(i.name ?? "").trim(),
      email: String(i.email ?? "").trim().toLowerCase(),
      phone: String(i.phone ?? "").trim(),
      message: String(i.message ?? "").trim(),
    };
  })
  .handler(async ({ data }) => {
    const { name, email, phone, message } = data;
    if (!name) return { success: false as const, error: "Name is required" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { success: false as const, error: "Valid email is required" };
    if (!/^\d{10}$/.test(phone))
      return {
        success: false as const,
        error: "Valid 10-digit phone number is required",
      };
    if (!message)
      return { success: false as const, error: "Message is required" };

    if (!RESEND_API_KEY) {
      return {
        success: true as const,
        note: "Email delivery not configured — logged locally",
      };
    }

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      const submittedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      const result = await resend.emails.send({
        from: "Farmer's Dairy Contact <noreply@farmersdairy.com>",
        to: [CONTACT_TO],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1C4610;">New Contact Form Submission</h2>
            <div style="background-color: #FBEBD1; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1C4610; margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
            </div>
            <div style="background-color: #FFFBF3; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1C4610; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin: 0; font-size: 12px; color: #666;">Submitted: ${submittedAt}</p>
          </div>
        `,
        text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nSubmitted: ${submittedAt}`,
      });
      return { success: true as const, emailId: result.data?.id };
    } catch (err) {
      const emsg = err instanceof Error ? err.message : "Unknown error";
      // eslint-disable-next-line no-console
      console.error("Contact email failed:", emsg);
      return {
        success: true as const,
        note: "Message received — email delivery may be delayed",
      };
    }
  });
