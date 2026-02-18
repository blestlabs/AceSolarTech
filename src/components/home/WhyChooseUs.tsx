"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "25-Year Warranty",
    description: "Industry-leading warranty on panels, inverters, and workmanship. Your investment is protected for decades.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Fastest Installation",
    description: "Average project completion in 7-14 days. Our streamlined process means you start saving sooner.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Tier-1 Components",
    description: "We only use globally certified, top-tier solar panels and inverters. No compromises on quality.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Subsidy Assistance",
    description: "We handle all government subsidy paperwork. Maximize your savings with up to 40% subsidies on residential systems.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
      </svg>
    ),
    title: "24/7 Monitoring",
    description: "Real-time system monitoring with mobile app access. We detect and resolve issues before you even notice.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Expert Team",
    description: "MNRE-certified engineers and technicians with 10+ years of experience in solar EPC projects.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Why AceSolarTech"
          title="The AceSolar Advantage"
          description="What sets us apart from every other solar installer."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-8 rounded-2xl border border-border hover:border-amber/20 bg-elevated/50 hover:bg-elevated transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center text-amber mb-5 group-hover:bg-amber group-hover:text-background transition-all duration-500">
                {reason.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
