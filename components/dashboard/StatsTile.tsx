"use client";

import { motion } from "framer-motion";
import { Clock, Target, TrendingUp, Award } from "lucide-react";
import BentoCard from "../ui/BentoCard";

const stats = [
  { label: "Hours this week", value: "12.4", icon: Clock, color: "text-cyan-400" },
  { label: "Goals met", value: "8/10", icon: Target, color: "text-green-400" },
  { label: "Avg. score", value: "91%", icon: TrendingUp, color: "text-violet-400" },
  { label: "Badges earned", value: "23", icon: Award, color: "text-amber-400" },
];

export default function StatsTile() {
  return (
    <BentoCard className="flex h-full flex-col justify-between p-5">
      <header className="mb-4">
        <h2 className="font-display text-base font-semibold text-white/80">
          This week
        </h2>
        <p className="mt-0.5 font-sans text-xs text-white/30">Your learning snapshot</p>
      </header>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col gap-1.5 rounded-xl border border-white/5 bg-white/3 p-3"
            >
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <p className="font-display text-xl font-bold text-white">{stat.value}</p>
              <p className="font-sans text-xs leading-tight text-white/35">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </BentoCard>
  );
}
