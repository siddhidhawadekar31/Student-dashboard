"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
  User,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-20 hidden shrink-0 flex-col border-r border-white/5 bg-bg-surface md:flex"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/5 px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="ml-3 font-display text-lg font-bold tracking-tight text-white"
              >
                Student Dashboard
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <div className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveId(item.id)}
                className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:text-white focus-visible:ring-2"
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active background with layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-lg bg-violet-500/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 shrink-0 transition-colors ${
                    isActive ? "text-violet-400" : "text-white/40"
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`relative z-10 font-sans text-sm font-medium ${
                        isActive ? "text-violet-300" : "text-white/50"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="nav-dot"
                    className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-violet-400"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/5 p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 ring-2 ring-white/10" />
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0 flex-1"
                >
                  <p className="truncate font-sans text-sm font-medium text-white/80">
                    Sofiya
                  </p>
                  <p className="truncate font-mono text-xs text-white/30">
                    Pro learner
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 flex w-full items-center justify-center rounded-lg px-3 py-2 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/5 bg-bg-surface/95 px-2 py-3 backdrop-blur-md md:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.slice(0, 4).map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveId(item.id)}
              className="relative flex flex-col items-center gap-1 px-3 py-1"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-highlight"
                  className="absolute inset-0 rounded-lg bg-violet-500/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`h-5 w-5 ${isActive ? "text-violet-400" : "text-white/40"}`}
              />
              <span className={`text-xs ${isActive ? "text-violet-300" : "text-white/40"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
