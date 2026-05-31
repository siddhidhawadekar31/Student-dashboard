"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { generateActivityData, getActivityColor } from "@/lib/activity";
import BentoCard from "../ui/BentoCard";

export default function ActivityTile() {
  const days = generateActivityData();
  const weeks: typeof days[] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const totalSessions = days.filter((d) => d.count > 0).length;
  const totalActivity = days.reduce((s, d) => s + d.count, 0);

  return (
    <BentoCard className="p-6">
      {/* Header */}
      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-violet-400" />
          <h2 className="font-display text-base font-semibold text-white/80">
            Learning activity
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="font-mono text-lg font-bold text-white">{totalSessions}</p>
            <p className="font-sans text-xs text-white/30">active days</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-lg font-bold text-violet-400">{totalActivity}</p>
            <p className="font-sans text-xs text-white/30">sessions</p>
          </div>
        </div>
      </header>

      {/* Graph */}
      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: "fit-content" }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: wi * 0.015 + di * 0.005,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  title={`${day.date}: ${day.count} sessions`}
                  className={`h-3 w-3 rounded-sm ${getActivityColor(day.count)} cursor-default transition-all duration-200 hover:scale-125 hover:brightness-125`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-white/25">
        <span>Less</span>
        {["bg-white/5", "bg-violet-900/60", "bg-violet-700/70", "bg-violet-500/80", "bg-violet-400"].map(
          (cls) => (
            <div key={cls} className={`h-3 w-3 rounded-sm ${cls}`} />
          )
        )}
        <span>More</span>
      </div>
    </BentoCard>
  );
}
