"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const contactInfo = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Head Office",
    lines: ["AceSolarTech Pvt. Ltd.", "123 Solar Avenue, Malviya Nagar", "Jaipur, Rajasthan 302017"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Phone",
    lines: ["+91 98765 43210", "+91 141 4567890", "Mon-Sat: 9:00 AM - 7:00 PM"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Email",
    lines: ["info@acesolartech.com", "quotes@acesolartech.com", "support@acesolartech.com"],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 text-xs font-display font-medium tracking-[0.2em] uppercase text-amber border border-amber/20 rounded-full bg-amber/5 mb-6"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl gradient-text mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Have questions about solar? Our team is here to help.
            Reach out and we&apos;ll respond within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-2xl bg-elevated border border-border hover:border-amber/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center text-amber mb-4">
                {info.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-3">{info.title}</h3>
              {info.lines.map((line) => (
                <p key={line} className="text-text-secondary text-sm">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl bg-elevated border border-amber/20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center text-amber mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">Message Sent!</h3>
                <p className="text-text-secondary mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-elevated border border-border">
                <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                  Send Us a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="residential">Residential Solar</option>
                      <option value="commercial">Commercial Solar</option>
                      <option value="industrial">Industrial EPC</option>
                      <option value="maintenance">O&M Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-text-secondary text-sm block mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors resize-none placeholder:text-text-muted"
                    placeholder="Tell us about your solar needs..."
                  />
                </div>

                <Button type="submit" size="lg">
                  Send Message
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </Button>
              </form>
            )}
          </motion.div>

          {/* Map / Office Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Map placeholder */}
            <div className="h-80 rounded-2xl bg-elevated border border-border overflow-hidden mb-6 relative">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-amber mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <p className="text-text-secondary text-sm">Jaipur, Rajasthan</p>
                  <p className="text-text-muted text-xs mt-1">Interactive map coming soon</p>
                </div>
              </div>
            </div>

            {/* Branch offices */}
            <div className="p-6 rounded-2xl bg-elevated border border-border">
              <h4 className="font-display font-semibold text-foreground mb-4">Branch Offices</h4>
              <div className="space-y-4">
                {[
                  { city: "Ahmedabad", state: "Gujarat" },
                  { city: "Mumbai", state: "Maharashtra" },
                  { city: "Bengaluru", state: "Karnataka" },
                  { city: "Delhi NCR", state: "Haryana" },
                ].map((office) => (
                  <div key={office.city} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber" />
                    <div>
                      <span className="text-foreground text-sm">{office.city}</span>
                      <span className="text-text-muted text-xs ml-2">{office.state}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
