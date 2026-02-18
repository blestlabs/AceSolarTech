"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Link from "next/link";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" /><path d="M9 18v.01" />
      </svg>
    ),
    title: "Residential Solar",
    description:
      "Custom rooftop systems designed for your home. Slash electricity bills by up to 90% with premium tier-1 panels and smart inverters.",
    href: "/services#residential",
    accent: "from-amber to-amber-light",
    span: "md:col-span-2",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" /><path d="M12 12v.01" /><path d="M2 12h20" />
      </svg>
    ),
    title: "Commercial Solar",
    description:
      "Large-scale rooftop and ground-mount systems for businesses. Reduce operational costs and achieve sustainability goals.",
    href: "/services#commercial",
    accent: "from-orange to-amber",
    span: "md:col-span-1",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Industrial EPC",
    description:
      "End-to-end engineering, procurement, and construction for MW-scale solar plants. Turnkey solutions with guaranteed performance.",
    href: "/services#industrial",
    accent: "from-amber-dark to-orange",
    span: "md:col-span-1",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "O&M Services",
    description:
      "Comprehensive operations and maintenance. Remote monitoring, cleaning schedules, and performance optimization for peak output.",
    href: "/services#maintenance",
    accent: "from-amber-light to-amber",
    span: "md:col-span-2",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Our Services"
          title="Solar Solutions at Every Scale"
          description="From residential rooftops to industrial megawatt plants, we engineer and deliver solar systems that perform."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={service.span}
            >
              <Link href={service.href}>
                <GlowCard className="h-full p-8 hover:border-amber/20 transition-colors duration-500">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-background mb-6`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-amber transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-amber text-sm font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </span>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
