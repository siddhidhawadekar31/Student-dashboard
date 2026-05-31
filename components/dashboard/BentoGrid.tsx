"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";
import StatsTile from "./StatsTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 24,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Dashboard overview"
      className="pb-20 md:pb-0"
    >
      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        {/* Hero tile — spans full width on lg */}
        <motion.div variants={tileVariants} className="lg:col-span-8">
          <HeroTile />
        </motion.div>

        {/* Stats tile */}
        <motion.div variants={tileVariants} className="lg:col-span-4">
          <StatsTile />
        </motion.div>

        {/* Course cards — dynamic from Supabase */}
        {courses.map((course) => (
          <motion.article
            key={course.id}
            variants={tileVariants}
            className="lg:col-span-4"
          >
            <CourseCard course={course} />
          </motion.article>
        ))}

        {/* Fallback if no courses */}
        {courses.length === 0 && (
          <motion.div variants={tileVariants} className="lg:col-span-12">
            <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-white/5 bg-bg-surface/50 text-center">
              <div>
                <p className="font-display text-lg text-white/40">No courses yet</p>
                <p className="mt-1 font-sans text-sm text-white/20">
                  Add rows to your Supabase <code className="font-mono">courses</code> table to get started.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Activity tile */}
        <motion.div variants={tileVariants} className="lg:col-span-12">
          <ActivityTile />
        </motion.div>
      </div>
    </motion.section>
  );
}
