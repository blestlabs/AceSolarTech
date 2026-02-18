"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Services: [
    { name: "Residential Solar", href: "/services#residential" },
    { name: "Commercial Solar", href: "/services#commercial" },
    { name: "Industrial EPC", href: "/services#industrial" },
    { name: "Solar Maintenance", href: "/services#maintenance" },
    { name: "Energy Audits", href: "/services#audits" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Our Projects", href: "/gallery" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Careers", href: "/contact" },
  ],
  Resources: [
    { name: "Solar Calculator", href: "/calculator" },
    { name: "Get a Quote", href: "/quote" },
    { name: "FAQs", href: "/about#faq" },
    { name: "Blog", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-border">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber to-orange rounded-lg rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-background text-lg">
                  A
                </span>
              </div>
              <div className="font-display font-bold text-xl tracking-tight">
                <span className="text-foreground">Ace</span>
                <span className="gradient-text">Solar</span>
              </div>
            </Link>
            <p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
              Transforming India&apos;s energy landscape with premium solar solutions.
              From rooftop installations to large-scale EPC projects, we deliver
              excellence at every scale.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {["twitter", "linkedin", "instagram", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-text-muted hover:text-amber hover:border-amber/40 transition-all duration-300"
                  aria-label={social}
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-5 text-sm tracking-wider uppercase">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-amber transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} AceSolarTech. All rights reserved.
          </p>
          <div className="flex gap-6 text-text-muted text-sm">
            <Link href="#" className="hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" />
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    youtube: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  };
  return icons[name] || null;
}
