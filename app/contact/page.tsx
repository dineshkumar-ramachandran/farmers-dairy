"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = "Name should contain only letters and spaces"
        } else {
          delete newErrors.name
        }
        break
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          newErrors.phone = "Phone number should be exactly 10 digits"
        } else {
          delete newErrors.phone
        }
        break
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address"
        } else {
          delete newErrors.email
        }
        break
    }

    setErrors(newErrors)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData])
    })

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData)
      setFormData({ name: "", email: "", phone: "", message: "" })
      alert("Thank you for your message! We'll get back to you soon.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Restrict input based on field type
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validate field
    validateField(name, value)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-text mb-4">Contact Us</h1>
          <p className="text-lg text-text max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you. Get in touch and we'll respond as
            soon as possible.
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <div className="card border-0 shadow-lg animate-slide-up">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-text mb-4 text-center">Find Us Here</h2>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.8185372406506!2d77.8506929!3d12.725258199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae775d6e8c7d65%3A0xe6313fdce3536e50!2sFarmer's%20Dairy!5e0!3m2!1sen!2sin!4v1750176194277!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Farmer's Dairy Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card border-0 shadow-lg animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl text-text">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full focus:ring-green focus:border-green ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full focus:ring-green focus:border-green ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full focus:ring-green focus:border-green ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="10-digit phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full focus:ring-green focus:border-green"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" className="btn-primary w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="card border-0 shadow-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-2xl text-text">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4 card-hover">
                  <div className="w-12 h-12 bg-mint-light rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-gentle">
                    <Phone className="w-6 h-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Phone</h3>
                    <p className="text-text">9363778989</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 card-hover">
                  <div className="w-12 h-12 bg-mint-light rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-gentle">
                    <Mail className="w-6 h-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Email</h3>
                    <p className="text-text">info@farmersdairy.com</p>
                    <p className="text-sm text-text opacity-70">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 card-hover">
                  <div className="w-12 h-12 bg-mint-light rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-gentle">
                    <MapPin className="w-6 h-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Location</h3>
                    <p className="text-text">
                      Hosur, Tamil Nadu
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 card-hover">
                  <div className="w-12 h-12 bg-mint-light rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-gentle">
                    <Clock className="w-6 h-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Delivery Hours</h3>
                    <p className="text-text">
                      Monday - Sunday
                      <br />
                      4:00 AM - 7:00 AM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="card border-0 shadow-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-xl text-text">Quick Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="card-hover p-3 rounded-lg">
                    <h4 className="font-medium text-text mb-1">How fresh is the milk?</h4>
                    <p className="text-sm text-text opacity-70">Our milk is delivered within 24 hours of milking.</p>
                  </div>
                  <div className="card-hover p-3 rounded-lg">
                    <h4 className="font-medium text-text mb-1">Can I pause my subscription?</h4>
                    <p className="text-sm text-text opacity-70">
                      Yes, you can pause or modify your subscription anytime.
                    </p>
                  </div>
                  <div className="card-hover p-3 rounded-lg">
                    <h4 className="font-medium text-text mb-1">Can I get Sample before Subscription?</h4>
                    <p className="text-sm text-text opacity-70">Yes, you can book your sample through Sample Pack</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
