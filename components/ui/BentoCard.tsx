"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoCard({ children, className }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.015,
        boxShadow:
          "0 0 0 1px rgba(124,58,237,0.25), 0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.08)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "grain relative rounded-2xl border border-white/5 bg-bg-surface shadow-card",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
