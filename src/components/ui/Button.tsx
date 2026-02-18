"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-display font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber to-orange text-background hover:shadow-[0_0_30px_rgba(247,166,0,0.4)] hover:scale-[1.02]",
    secondary:
      "bg-elevated text-foreground border border-border-light hover:border-amber/40 hover:bg-amber/5",
    ghost:
      "text-text-secondary hover:text-amber bg-transparent",
    outline:
      "border border-amber/30 text-amber hover:bg-amber/10 hover:border-amber/60",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-10 py-4.5 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: variant === "primary" ? 1.02 : 1 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </motion.button>
  );
}
