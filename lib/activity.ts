import type { ActivityDay } from "@/types";

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    // Simulate realistic activity patterns
    const rand = Math.random();
    let count = 0;
    if (rand > 0.35) {
      count = Math.floor(Math.random() * 8) + 1;
    }

    days.push({ date: dateStr, count });
  }

  return days;
}

export function getActivityColor(count: number): string {
  if (count === 0) return "bg-white/5";
  if (count <= 2) return "bg-violet-900/60";
  if (count <= 4) return "bg-violet-700/70";
  if (count <= 6) return "bg-violet-500/80";
  return "bg-violet-400";
}
