"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const projects = [
  {
    title: "Sunrise Residency",
    location: "Jaipur, Rajasthan",
    capacity: "250 kW",
    type: "Residential Complex",
    gradient: "from-amber/20 to-orange/10",
  },
  {
    title: "GreenTech Industries",
    location: "Ahmedabad, Gujarat",
    capacity: "2 MW",
    type: "Industrial EPC",
    gradient: "from-orange/20 to-amber/10",
  },
  {
    title: "SkyPark Business Hub",
    location: "Pune, Maharashtra",
    capacity: "1.5 MW",
    type: "Commercial Rooftop",
    gradient: "from-amber-dark/20 to-amber/10",
  },
  {
    title: "AgriSolar Farm",
    location: "Hyderabad, Telangana",
    capacity: "5 MW",
    type: "Ground Mount",
    gradient: "from-amber-light/20 to-amber/10",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Our Work"
          title="Featured Projects"
          description="A glimpse into our portfolio of successful solar installations across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border hover:border-amber/20 transition-all duration-500"
            >
              {/* Image placeholder with gradient */}
              <div
                className={`h-64 bg-gradient-to-br ${project.gradient} bg-elevated relative overflow-hidden`}
              >
                {/* Solar panel pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-0.5 p-4">
                    {[...Array(48)].map((_, j) => (
                      <div
                        key={j}
                        className="bg-foreground/20 rounded-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Capacity badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass text-amber font-display font-semibold text-sm">
                  {project.capacity}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="p-6 bg-elevated">
                <span className="text-amber text-xs font-display uppercase tracking-wider">
                  {project.type}
                </span>
                <h3 className="font-display font-semibold text-xl text-foreground mt-1 mb-1">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/gallery" variant="outline">
            View All Projects
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
