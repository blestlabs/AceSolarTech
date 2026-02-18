"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Jaipur",
    content:
      "AceSolarTech transformed our home energy. The 10kW system they installed has eliminated our electricity bill entirely. The installation was clean, professional, and completed ahead of schedule. Best investment we ever made.",
    rating: 5,
    savings: "₹15,000/mo saved",
  },
  {
    name: "Priya Patel",
    role: "Factory Owner, Ahmedabad",
    content:
      "We installed a 500kW system for our manufacturing facility. The team handled everything from design to commissioning. Production quality is excellent and the ROI has been faster than projected. Truly impressive EPC capability.",
    rating: 5,
    savings: "₹4.5L/mo saved",
  },
  {
    name: "Dr. Amit Verma",
    role: "Hospital Administrator, Delhi",
    content:
      "Reliable power is critical for us. AceSolarTech designed a hybrid system with battery backup that keeps our equipment running 24/7. Their after-sales monitoring has been outstanding. Zero downtime in 2 years.",
    rating: 5,
    savings: "₹2.8L/mo saved",
  },
  {
    name: "Sunita Reddy",
    role: "Farm Owner, Hyderabad",
    content:
      "The solar water pump system has been a game changer for our 50-acre farm. No more diesel costs, no more power cuts. The agricultural team understood our needs perfectly and delivered an amazing solution.",
    rating: 5,
    savings: "₹45,000/mo saved",
  },
  {
    name: "Vikram Mehta",
    role: "IT Park Manager, Pune",
    content:
      "Managing a 200,000 sq ft office complex, energy costs were our biggest headache. AceSolarTech installed a 1MW rooftop system that covers 70% of our consumption. The monitoring dashboard they provided is fantastic.",
    rating: 5,
    savings: "₹8L/mo saved",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Hundreds"
          description="Real stories from real clients who made the switch to solar with AceSolarTech."
        />

        <div className="max-w-4xl mx-auto">
          {/* Quote mark */}
          <div className="text-center mb-8">
            <span className="text-8xl font-display text-amber/10 leading-none">&ldquo;</span>
          </div>

          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-light">
                  {testimonials[current].content}
                </p>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#F7A600"
                      className="drop-shadow-[0_0_4px_rgba(247,166,0,0.5)]"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Author */}
                <div className="mb-2">
                  <span className="font-display font-semibold text-foreground">
                    {testimonials[current].name}
                  </span>
                </div>
                <div className="text-text-secondary text-sm mb-3">
                  {testimonials[current].role}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 text-amber text-sm font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  {testimonials[current].savings}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-amber"
                    : "w-2 h-2 bg-border-light hover:bg-text-muted"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
