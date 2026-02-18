"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";

const team = [
  { name: "Arjun Kapoor", role: "Founder & CEO", bio: "15+ years in renewable energy. Former VP at Tata Power Solar." },
  { name: "Meera Nair", role: "CTO", bio: "IIT Bombay alumna. Expert in solar system design and grid integration." },
  { name: "Vikram Singh", role: "Head of EPC", bio: "Managed 200+ MW of solar installations across India." },
  { name: "Priya Sharma", role: "Operations Director", bio: "Streamlined operations for 500+ residential installations." },
];

const milestones = [
  { year: "2014", event: "Founded in Jaipur with a vision to make solar accessible" },
  { year: "2016", event: "Crossed 100 residential installations milestone" },
  { year: "2018", event: "Expanded to commercial and industrial EPC projects" },
  { year: "2020", event: "Reached 10MW total installed capacity" },
  { year: "2022", event: "Expanded operations to 15 states across India" },
  { year: "2024", event: "Crossed 50MW installed capacity and 500+ projects" },
];

const certifications = [
  "MNRE Approved",
  "ISO 9001:2015",
  "ISO 14001:2015",
  "OHSAS 18001",
  "BIS Certified",
  "NABCEP Aligned",
];

const faqs = [
  {
    q: "How much does a residential solar system cost?",
    a: "A typical 3-5kW residential system costs ₹1.5-2.5 lakhs after government subsidies. The exact cost depends on your location, roof type, and energy requirements. We provide free detailed quotations.",
  },
  {
    q: "What government subsidies are available?",
    a: "Under the PM Surya Ghar scheme, residential customers can get up to 40% subsidy for systems up to 3kW, and 20% for 3-10kW systems. We handle all subsidy paperwork and applications.",
  },
  {
    q: "How long does installation take?",
    a: "Residential installations typically take 3-5 days. Commercial projects take 2-4 weeks depending on size. Industrial EPC projects are scheduled based on capacity and complexity.",
  },
  {
    q: "What is the warranty coverage?",
    a: "We offer 25-year performance warranty on panels, 10-year warranty on inverters, and 5-year workmanship warranty. Our O&M services extend coverage with ongoing support.",
  },
  {
    q: "Will solar work during monsoon or cloudy days?",
    a: "Yes! Modern solar panels generate power even on cloudy days, typically at 25-50% efficiency. Our systems are designed to account for seasonal variations to meet your annual energy needs.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, we partner with leading banks and NBFCs to offer solar loans with EMIs as low as ₹899/month for residential systems. Many customers find their EMI is less than their current electricity bill.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 text-xs font-display font-medium tracking-[0.2em] uppercase text-amber border border-amber/20 rounded-full bg-amber/5 mb-6"
            >
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Engineering a{" "}
              <span className="gradient-text">Brighter</span> Future
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg leading-relaxed"
            >
              Since 2014, AceSolarTech has been at the forefront of India&apos;s solar revolution.
              We combine cutting-edge technology with local expertise to deliver solar solutions
              that exceed expectations. Our mission is simple: make clean energy accessible,
              affordable, and reliable for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-surface/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter target={500} suffix="+" label="Projects Completed" />
            <AnimatedCounter target={50} suffix="MW+" label="Capacity Installed" />
            <AnimatedCounter target={200} suffix="+" label="Team Members" />
            <AnimatedCounter target={15} suffix="+" label="States Served" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlowCard className="p-8 h-full">
                <div className="w-14 h-14 rounded-xl bg-amber/10 flex items-center justify-center text-amber mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">Our Mission</h3>
                <p className="text-text-secondary leading-relaxed">
                  To accelerate India&apos;s transition to clean energy by providing world-class solar
                  solutions that are accessible, reliable, and deliver exceptional returns.
                  Every installation we complete is a step toward a sustainable future.
                </p>
              </GlowCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <GlowCard className="p-8 h-full">
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">Our Vision</h3>
                <p className="text-text-secondary leading-relaxed">
                  To be India&apos;s most trusted solar EPC company by 2030, powering 1GW of clean energy
                  capacity and setting the benchmark for quality, innovation, and customer satisfaction
                  in the renewable energy sector.
                </p>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Leadership"
            title="Meet the Team"
            description="Experienced professionals driving India's solar transformation."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden border border-border hover:border-amber/20 transition-all duration-500 bg-elevated">
                  {/* Avatar placeholder */}
                  <div className="h-48 bg-gradient-to-br from-amber/10 to-orange/5 relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber to-orange flex items-center justify-center font-display font-bold text-2xl text-background">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-semibold text-foreground">{member.name}</h4>
                    <p className="text-amber text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-text-secondary text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading label="Journey" title="Our Story" />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber/40 via-amber/20 to-transparent md:-translate-x-px" />

            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber -translate-x-1.5 md:-translate-x-1.5 mt-1.5 glow-amber z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="font-display font-bold text-amber text-lg">{milestone.year}</span>
                  <p className="text-text-secondary mt-1">{milestone.event}</p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-surface/50 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="font-display font-semibold text-center text-foreground mb-8">
            Certifications & Accreditations
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-5 py-2.5 rounded-full border border-border bg-elevated text-text-secondary text-sm font-medium"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know about going solar."
          />

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl gradient-text mb-4">
            Ready to Join the Solar Revolution?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let&apos;s discuss how solar energy can transform your energy costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/quote" size="lg">
              Get Started
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-border rounded-xl overflow-hidden hover:border-amber/20 transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left bg-elevated hover:bg-elevated/80 transition-colors"
      >
        <span className="font-display font-medium text-foreground pr-4">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-amber shrink-0"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-text-secondary leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
