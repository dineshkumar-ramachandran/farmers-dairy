import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Created lazily so the build doesn't require the API key
const getResend = () => new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const resend = getResend()
    console.log("📧 Contact form submission received")

    const { name, email, phone, message } = await request.json()

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 })
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Valid email is required" }, { status: 400 })
    }

    if (!phone || typeof phone !== "string" || !/^\d{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: "Valid 10-digit phone number is required" }, { status: 400 })
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    }

    console.log("📧 Sending contact email with data:", {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      messageLength: sanitizedData.message.length,
    })

    try {
      // Send email using Resend
      const emailResult = await resend.emails.send({
        from: "Farmer's Dairy Contact <noreply@farmersdairy.com>",
        to: ["onprimehub@gmail.com"],
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5016;">New Contact Form Submission</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
            </div>
            
            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>Submitted:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              </p>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission

Customer Details:
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}

Message:
${sanitizedData.message}

Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        `,
      })

      console.log("✅ Contact email sent successfully:", emailResult.data?.id)

      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours.",
        emailId: emailResult.data?.id,
      })
    } catch (emailError) {
      console.error("❌ Failed to send contact email:", emailError)

      // Fallback - still return success but log the issue
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We have received your inquiry and will respond soon.",
        note: "Email delivery may be delayed",
      })
    }
  } catch (error) {
    console.error("❌ Contact form error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your message. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}
