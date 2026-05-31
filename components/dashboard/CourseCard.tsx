"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/types";
import BentoCard from "../ui/BentoCard";

interface CourseCardProps {
  course: Course;
}

const GRADIENT_PAIRS: [string, string][] = [
  ["from-violet-500/20", "to-cyan-500/10"],
  ["from-pink-500/20", "to-violet-500/10"],
  ["from-cyan-500/20", "to-green-500/10"],
  ["from-amber-500/20", "to-pink-500/10"],
];

const ICON_COLORS = [
  "text-violet-400",
  "text-cyan-400",
  "text-pink-400",
  "text-amber-400",
  "text-green-400",
];

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // Map icon_name string to Lucide icon component
  const iconKey = name
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("") as keyof typeof LucideIcons;

  const Icon = (LucideIcons[iconKey] ?? LucideIcons.BookOpen) as React.FC<{ className?: string }>;
  return <Icon className={className} />;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [displayed, setDisplayed] = useState(0);
  const hasAnimated = useRef(false);

  // Hash course id to pick a stable gradient/color pair
  const hashIndex = course.id.charCodeAt(0) % GRADIENT_PAIRS.length;
  const [gradFrom, gradTo] = GRADIENT_PAIRS[hashIndex];
  const iconColor = ICON_COLORS[hashIndex % ICON_COLORS.length];

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const duration = 1200;
    const target = course.progress;

    function step(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    }

    // Delay to let stagger animation finish first
    const timer = setTimeout(() => requestAnimationFrame(step), 400);
    return () => clearTimeout(timer);
  }, [course.progress]);

  return (
    <BentoCard className="group relative h-full min-h-[180px] overflow-hidden p-5">
      {/* Grain + gradient background texture */}
      <div
        className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-br ${gradFrom} ${gradTo} opacity-60`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-4">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <DynamicIcon name={course.icon_name} className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold leading-tight text-white/90 line-clamp-2">
              {course.title}
            </h2>
            <p className="mt-0.5 font-mono text-xs text-white/30">Active course</p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-sans text-xs text-white/40">Progress</span>
            <motion.span
              className="font-mono text-xs font-medium text-white/70"
              animate={{ opacity: 1 }}
            >
              {displayed}%
            </motion.span>
          </div>

          {/* Progress bar track */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${gradFrom.replace("/20", "")} to-cyan-400`}
              initial={{ width: "0%" }}
              animate={{ width: `${course.progress}%` }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
