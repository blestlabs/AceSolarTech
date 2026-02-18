"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Radial gradient - sun glow */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-amber/5 blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-orange/3 blur-[120px]" />

        {/* Animated orbiting rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-amber/5"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] rounded-full border border-amber/[0.03]"
          >
            {/* Orbiting dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber/40" />
          </motion.div>
        </div>

        {/* Animated sun element */}
        <motion.div
          className="absolute top-[15%] right-[10%] md:right-[15%]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber via-orange to-amber-dark opacity-20 blur-xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber to-orange opacity-30 blur-md" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-light to-amber opacity-50" />
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-0.5 h-8 md:h-12 bg-gradient-to-t from-amber/40 to-transparent origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                  transformOrigin: "50% 100%",
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber/20 bg-amber/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <span className="text-amber text-sm font-medium">
              Leading Solar EPC Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-8"
          >
            Power Your
            <br />
            Future With{" "}
            <span className="gradient-text">
              Solar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Premium solar installations for homes, businesses, and industries.
            Cutting-edge technology, expert engineering, and unmatched
            after-sales support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Button href="/quote" size="lg">
              Get Free Quote
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Button>
            <Button href="/calculator" variant="outline" size="lg">
              Calculate Savings
            </Button>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "50MW+", label: "Capacity Installed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "10+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="font-display font-bold text-2xl md:text-3xl text-foreground group-hover:text-amber transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-text-muted text-xs uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border-light flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-amber" />
        </motion.div>
      </motion.div>
    </section>
  );
}
