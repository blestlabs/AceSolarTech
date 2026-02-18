"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 50, suffix: "MW+", label: "Capacity Installed" },
  { target: 15, suffix: "+", label: "States Covered" },
  { target: 98, suffix: "%", label: "Uptime Guarantee" },
];

export default function StatsCounter() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 dot-pattern" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      {/* Glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 bg-amber/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 bg-orange/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
