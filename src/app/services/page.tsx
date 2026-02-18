"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GlowCard from "@/components/ui/GlowCard";

const services = [
  {
    id: "residential",
    title: "Residential Solar",
    tagline: "Power Your Home, Cut Your Bills",
    description:
      "Custom-designed rooftop solar systems for Indian homes. We handle everything from design to commissioning, including net metering and government subsidy applications.",
    features: [
      "3kW to 25kW rooftop systems",
      "Tier-1 monocrystalline panels",
      "Smart hybrid inverters",
      "Net metering setup",
      "Government subsidy processing",
      "Mobile app monitoring",
      "25-year performance warranty",
      "Annual maintenance included",
    ],
    stats: { savings: "Up to 90%", payback: "3-5 years", subsidy: "Up to 40%" },
    gradient: "from-amber to-amber-light",
  },
  {
    id: "commercial",
    title: "Commercial Solar",
    tagline: "Sustainable Business, Lower Costs",
    description:
      "Large-scale rooftop and carport solar for offices, malls, hospitals, and commercial buildings. Accelerated depreciation benefits and green building certifications.",
    features: [
      "50kW to 5MW systems",
      "Rooftop and carport solutions",
      "OPEX and CAPEX models",
      "Accelerated depreciation benefits",
      "Power purchase agreements",
      "SCADA monitoring systems",
      "Performance guarantee",
      "Dedicated account manager",
    ],
    stats: { savings: "Up to 70%", payback: "2-4 years", subsidy: "Tax benefits" },
    gradient: "from-orange to-amber",
  },
  {
    id: "industrial",
    title: "Industrial EPC",
    tagline: "Megawatt-Scale Solar Power",
    description:
      "Full-service engineering, procurement, and construction for ground-mounted solar farms and industrial rooftop projects. Turnkey solutions from feasibility to commissioning.",
    features: [
      "1MW to 100MW capacity",
      "Ground mount & rooftop",
      "Complete EPC turnkey",
      "Grid integration",
      "Environmental clearances",
      "Advanced SCADA/DAS",
      "Performance ratio guarantee",
      "O&M contracts available",
    ],
    stats: { savings: "Custom ROI", payback: "4-6 years", subsidy: "Policy support" },
    gradient: "from-amber-dark to-orange",
  },
  {
    id: "maintenance",
    title: "O&M Services",
    tagline: "Maximize Your System Performance",
    description:
      "Comprehensive operations and maintenance services for existing solar installations. Remote monitoring, preventive maintenance, and rapid response for maximum uptime.",
    features: [
      "24/7 remote monitoring",
      "Preventive maintenance",
      "Panel cleaning schedules",
      "Inverter health checks",
      "Performance analytics",
      "Rapid fault resolution",
      "Spare parts management",
      "Annual performance reports",
    ],
    stats: { savings: "15%+ boost", payback: "Ongoing", subsidy: "N/A" },
    gradient: "from-amber-light to-amber",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 text-xs font-display font-medium tracking-[0.2em] uppercase text-amber border border-amber/20 rounded-full bg-amber/5 mb-6"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl gradient-text mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            End-to-end solar solutions tailored to your needs. From a 3kW home system
            to a 100MW solar farm, we deliver excellence.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 relative ${idx % 2 === 0 ? "" : "bg-surface/50"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={idx % 2 !== 0 ? "lg:order-2" : ""}
              >
                <span className={`inline-block text-sm font-display font-semibold gradient-text mb-3`}>
                  {service.tagline}
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7A600" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button href="/quote">
                  Get a Quote for {service.title}
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </Button>
              </motion.div>

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={idx % 2 !== 0 ? "lg:order-1" : ""}
              >
                <GlowCard className="p-8">
                  {/* Decorative image area */}
                  <div className={`h-48 rounded-xl bg-gradient-to-br ${service.gradient} opacity-20 mb-8 relative overflow-hidden`}>
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-6">
                      {[...Array(24)].map((_, j) => (
                        <div key={j} className="bg-foreground/10 rounded-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center p-4 rounded-xl bg-background/50 border border-border">
                        <div className="font-display font-bold text-xl text-amber mb-1">
                          {value}
                        </div>
                        <div className="text-text-muted text-xs uppercase tracking-wider capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-amber/5 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <SectionHeading
            title="Not Sure Which Solution Fits?"
            description="Our solar consultants will analyze your energy needs and recommend the perfect system. Free consultation, zero obligation."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/quote" size="lg">
              Schedule Free Consultation
            </Button>
            <Button href="/calculator" variant="outline" size="lg">
              Try Our Calculator
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
