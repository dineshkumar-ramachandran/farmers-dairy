import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { ADDRESS, EMAIL, PHONE } from "@/lib/products";
import { sendContactEmail } from "@/lib/contact.server";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Farmer's Dairy — Hosur, Tamil Nadu" },
      {
        name: "description",
        content:
          "Call 9363778989 or write to info@farmersdairy.com for daily milk subscriptions and orders in Hosur.",
      },
      { property: "og:title", content: "Contact Farmer's Dairy — Hosur, Tamil Nadu" },
      { property: "og:description", content: "Get in touch for daily milk subscriptions in Hosur." },
    ],
  }),
  component: Contact,
});

type Form = { name: string; email: string; phone: string; message: string };
const empty: Form = { name: "", email: "", phone: "", message: "" };

function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Form> = {};
    if (!form.name.trim()) err.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) err.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(form.phone)) err.phone = "Enter a valid 10 digit phone number";
    if (!form.message.trim() || form.message.length > 1000) err.message = "Enter a message under 1000 characters";
    setErrors(err);
    if (Object.keys(err).length) return;

    setBusy(true);
    try {
      const res = await sendContactEmail({ data: form }).catch(() => ({
        success: false as const,
        error: "Network error",
      }));
      if (res.success) {
        toast.success("Thanks! We'll get back to you shortly.");
        setForm(empty);
      } else {
        toast.error(res.error || "Message could not be sent. Please call us instead.");
      }
    } finally {
      setBusy(false);
    }
  };

  const input = (k: keyof Form, label: string, type = "text") => (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">{label}</span>
      <input
        type={type}
        value={form[k]}
        onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
        className="mt-2 h-12 w-full rounded-xl border border-green/20 bg-card px-4 outline-none focus:border-green"
      />
      {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <span className="eyebrow">Contact</span>
      <h1 className="display-hero mt-5 text-4xl md:text-6xl">
        We'd Love to <span className="text-gradient-green">Hear From You</span>
      </h1>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <form onSubmit={submit} className="card-fd space-y-5 p-8">
          {input("name", "Name")}
          {input("email", "Email", "email")}
          {input("phone", "Phone", "tel")}
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">Message</span>
            <textarea
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-green/20 bg-card p-4 outline-none focus:border-green"
            />
            {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
          </label>
          <button className="btn btn-primary w-full" disabled={busy}>
            Send Message
          </button>
        </form>

        <div className="space-y-4">
          {[
            { Icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE}` },
            { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { Icon: MapPin, label: "Address", value: ADDRESS },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} className="card-fd flex items-center gap-5 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-butter text-green-deep">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">{label}</p>
                {href ? (
                  <a href={href} className="font-display text-lg text-green-deep hover:text-butter-deep">
                    {value}
                  </a>
                ) : (
                  <p className="font-display text-lg text-green-deep">{value}</p>
                )}
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-3xl border border-green/10">
            <iframe
              title="Farmer's Dairy location in Hosur"
              src="https://www.google.com/maps?q=Hosur,Tamil%20Nadu&output=embed"
              loading="lazy"
              className="h-72 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
