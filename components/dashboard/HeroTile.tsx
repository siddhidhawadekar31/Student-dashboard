"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, ArrowRight } from "lucide-react";
import BentoCard from "../ui/BentoCard";

export default function HeroTile() {
  const [greeting, setGreeting] = useState("Good afternoon");
  const streak = 14;

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
    );
  }, []);

  return (
    <BentoCard className="relative min-h-[200px] overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-20 -right-10 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <p className="font-sans text-sm font-medium text-white/40 tracking-widest uppercase">{greeting}</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Welcome back, <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Sofiya</span> 👋
          </h1>
          <p className="mt-2 font-sans text-sm text-white/40">You&apos;re on track to hit your weekly goal. Keep it up!</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">
            <Flame className="h-4 w-4 text-orange-400 animate-pulse-slow" />
            <span className="font-display text-sm font-semibold text-orange-300">{streak} day streak</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="font-display text-sm font-semibold text-amber-300">2,480 XP</span>
          </motion.div>
          <motion.button whileHover={{ scale: 1.04, x: 2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="ml-auto flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 font-sans text-sm font-medium text-white shadow-glow transition-shadow hover:bg-violet-500">
            Continue learning
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </BentoCard>
  );
}
