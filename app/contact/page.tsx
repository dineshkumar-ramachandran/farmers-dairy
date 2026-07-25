"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

const contactChannels = [
  {
    icon: Phone,
    title: "Phone",
    lines: [siteConfig.phone],
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: Mail,
    title: "Email",
    lines: [siteConfig.email, "We'll respond within 24 hours"],
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: "Location",
    lines: ["Hosur, Tamil Nadu", "India"],
  },
  {
    icon: Clock,
    title: "Delivery Hours",
    lines: ["Monday - Sunday", "4:00 AM - 7:00 AM"],
  },
];

const faqs = [
  {
    q: "How fresh is the milk?",
    a: "Our milk is delivered within 24 hours of milking.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Yes, you can pause or modify your subscription anytime.",
  },
  {
    q: "Can I get Sample before Subscription?",
    a: "Yes, you can book your sample through Sample Pack",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = "Name should contain only letters and spaces";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else {
          delete newErrors.name;
        }
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.phone = "Phone number must be exactly 10 digits";
        } else {
          delete newErrors.phone;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          newErrors.message = "Message must be at least 10 characters";
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateAllFields = () => {
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    validateAllFields();

    // Check if form is valid
    const isValid =
      Object.keys(formData).every(
        (key) => formData[key as keyof typeof formData].trim() !== ""
      ) && Object.keys(errors).length === 0;

    if (!isValid) {
      setSubmitStatus({
        type: "error",
        message: "Please fill all fields correctly before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      console.log("Submitting contact form:", formData);

      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Contact form result:", result);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Restrict input based on field type
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change
    validateField(name, value);

    // Clear submit status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const inputClasses = (field: string) =>
    `w-full rounded-xl border-mint/30 bg-white/70 backdrop-blur px-4 py-3 h-auto transition-all duration-300 focus:ring-2 focus:ring-green/40 focus:border-green hover:border-mint ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Editorial page hero */}
      <section className="relative pt-14 sm:pt-20 pb-14">
        <div
          className="absolute top-[-5rem] left-[-6rem] w-80 h-80 blob animate-blob bg-mint/20"
          aria-hidden="true"
        />
        <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-num" aria-hidden="true">
                Contact
              </span>
              <span className="eyebrow">We'd Love to Hear From You</span>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
            <Reveal delay={0.08}>
              <h1 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
                Contact <span className="italic text-gradient-green">Us</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lg sm:text-xl text-text/70 leading-relaxed lg:pb-2">
                Have questions about our products or services? We'd love to hear
                from you. Get in touch and we'll respond as soon as possible.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 pb-24">
        {/* Map */}
        <Reveal className="mb-12">
          <div className="card !p-4 sm:!p-6 overflow-hidden">
            <h2 className="font-display text-2xl font-semibold text-text mb-4 text-center">
              Find Us Here
            </h2>
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.8185372406506!2d77.8506929!3d12.725258199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae775d6e8c7d65%3A0xe6313fdce3536e50!2sFarmer's%20Dairy!5e0!3m2!1sen!2sin!4v1750176194277!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Farmer's Dairy Location"
              />
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact form */}
          <Reveal direction="right">
            <div className="card !p-8 sm:!p-10 h-full">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text mb-6">
                Send us a Message
              </h2>

              <AnimatePresence>
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`mb-6 flex items-center rounded-2xl border p-4 ${
                      submitStatus.type === "success"
                        ? "border-mint/50 bg-mint-light"
                        : "border-red-200 bg-red-50"
                    }`}
                    role="status">
                    {submitStatus.type === "success" ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}>
                        <CheckCircle className="w-5 h-5 text-green mr-3 flex-shrink-0" />
                      </motion.span>
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    )}
                    <p
                      className={`text-sm ${
                        submitStatus.type === "success"
                          ? "text-green"
                          : "text-red-800"
                      }`}>
                      {submitStatus.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses("name")}
                    placeholder="Your full name"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses("email")}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text mb-2">
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses("phone")}
                    placeholder="10-digit phone number"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={inputClasses("message")}
                    placeholder="Tell us how we can help you..."
                    disabled={isSubmitting}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="btn-primary w-full !h-auto"
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>

          {/* Contact info + FAQ */}
          <div className="space-y-8">
            <Reveal direction="left" delay={0.1}>
              <div className="card !p-8">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text mb-6">
                  Get in Touch
                </h2>
                <Stagger className="space-y-5" staggerDelay={0.08}>
                  {contactChannels.map((channel) => {
                    const content = (
                      <>
                        <motion.span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-mint-light to-mint/30"
                          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                          transition={{ duration: 0.45 }}>
                          <channel.icon
                            className="w-5 h-5 text-green"
                            aria-hidden="true"
                          />
                        </motion.span>
                        <span>
                          <span className="block font-semibold text-text mb-0.5">
                            {channel.title}
                          </span>
                          {channel.lines.map((line, i) => (
                            <span
                              key={line}
                              className={`block ${
                                i === 0
                                  ? "text-sm text-text/80"
                                  : "text-xs text-text/60"
                              }`}>
                              {line}
                            </span>
                          ))}
                        </span>
                      </>
                    );
                    return (
                      <StaggerItem key={channel.title}>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            className="flex items-start gap-4 rounded-2xl p-2 -m-2 transition-colors duration-300 hover:bg-mint-light/50">
                            {content}
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 p-2 -m-2">
                            {content}
                          </div>
                        )}
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <div className="card !p-8">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-5">
                  Quick Questions?
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="rounded-2xl border border-mint/20 bg-mint-light/40 p-4 transition-all duration-300 hover:border-mint/50 hover:bg-mint-light hover:-translate-y-0.5">
                      <h3 className="font-medium text-text text-sm mb-1">
                        {faq.q}
                      </h3>
                      <p className="text-xs text-text/65 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
