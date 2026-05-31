import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0a0f",
          surface: "#10101a",
          elevated: "#16162a",
          card: "#1a1a2e",
        },
        accent: {
          purple: "#7c3aed",
          cyan: "#06b6d4",
          pink: "#ec4899",
          amber: "#f59e0b",
          green: "#10b981",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          glow: "rgba(124,58,237,0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui"],
        display: ["var(--font-display)", "system-ui"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsla(270,60%,20%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,60%,20%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(330,60%,15%,0.3) 0px, transparent 50%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(60px) rotate(-360deg)",
          },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)",
        "glow-cyan":
          "0 0 20px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1)",
        "glow-pink":
          "0 0 20px rgba(236,72,153,0.3), 0 0 60px rgba(236,72,153,0.1)",
        card: "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
      },
    },
  },
  plugins: [],
};

export default config;
