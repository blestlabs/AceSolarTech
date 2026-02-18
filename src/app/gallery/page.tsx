"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const categories = ["All", "Residential", "Commercial", "Industrial", "Agriculture"];

const projects = [
  { id: 1, title: "Modern Villa Rooftop", location: "Jaipur, Rajasthan", capacity: "15 kW", category: "Residential", gradient: "from-amber/30 to-orange/10" },
  { id: 2, title: "Textile Mill Solar Plant", location: "Ahmedabad, Gujarat", capacity: "2.5 MW", category: "Industrial", gradient: "from-orange/30 to-amber-dark/10" },
  { id: 3, title: "IT Park Carport Solar", location: "Pune, Maharashtra", capacity: "1.2 MW", category: "Commercial", gradient: "from-amber-dark/30 to-orange/10" },
  { id: 4, title: "Farm Solar Pump System", location: "Nashik, Maharashtra", capacity: "25 HP", category: "Agriculture", gradient: "from-amber-light/30 to-amber/10" },
  { id: 5, title: "Apartment Complex", location: "Bengaluru, Karnataka", capacity: "50 kW", category: "Residential", gradient: "from-amber/25 to-amber-light/10" },
  { id: 6, title: "Shopping Mall Rooftop", location: "Delhi NCR", capacity: "800 kW", category: "Commercial", gradient: "from-orange/25 to-amber/10" },
  { id: 7, title: "Dairy Farm Microgrid", location: "Anand, Gujarat", capacity: "100 kW", category: "Agriculture", gradient: "from-amber-light/25 to-amber/10" },
  { id: 8, title: "Automotive Factory", location: "Chennai, Tamil Nadu", capacity: "5 MW", category: "Industrial", gradient: "from-amber-dark/25 to-orange/10" },
  { id: 9, title: "Heritage Hotel Solar", location: "Udaipur, Rajasthan", capacity: "75 kW", category: "Commercial", gradient: "from-amber/20 to-orange/10" },
  { id: 10, title: "Bungalow Off-Grid", location: "Lonavala, Maharashtra", capacity: "10 kW", category: "Residential", gradient: "from-orange/20 to-amber/10" },
  { id: 11, title: "Solar Park Phase 1", location: "Jodhpur, Rajasthan", capacity: "10 MW", category: "Industrial", gradient: "from-amber-dark/20 to-amber/10" },
  { id: 12, title: "Greenhouse Solar", location: "Nashik, Maharashtra", capacity: "50 kW", category: "Agriculture", gradient: "from-amber-light/20 to-amber/10" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 text-xs font-display font-medium tracking-[0.2em] uppercase text-amber border border-amber/20 rounded-full bg-amber/5 mb-6"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl gradient-text mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            500+ successful installations across India. Browse our portfolio of solar excellence.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-amber text-background"
                  : "bg-elevated border border-border text-text-secondary hover:text-foreground hover:border-amber/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border hover:border-amber/20 transition-all duration-500"
              >
                <div className={`h-56 bg-gradient-to-br ${project.gradient} bg-elevated relative overflow-hidden`}>
                  {/* Panel pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-6 grid-rows-4 h-full gap-0.5 p-4">
                      {[...Array(24)].map((_, j) => (
                        <div key={j} className="bg-foreground/20 rounded-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs text-amber font-display font-medium">
                    {project.category}
                  </div>

                  {/* Capacity badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber/90 text-background text-xs font-display font-bold">
                    {project.capacity}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-amber flex items-center justify-center text-amber">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-elevated">
                  <h3 className="font-display font-semibold text-foreground mb-1">{project.title}</h3>
                  <p className="text-text-secondary text-sm flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl bg-elevated border border-border overflow-hidden"
            >
              <div className={`h-72 bg-gradient-to-br ${selectedProject.gradient} bg-elevated relative`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-6 h-full gap-0.5 p-6">
                    {[...Array(48)].map((_, j) => (
                      <div key={j} className="bg-foreground/20 rounded-sm" />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-amber transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <span className="text-amber text-xs font-display uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <h2 className="font-display font-bold text-2xl text-foreground mt-1 mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-text-secondary text-sm mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    {selectedProject.capacity}
                  </span>
                </div>
                <Button href="/quote">
                  Get a Similar System
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
