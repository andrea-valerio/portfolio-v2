import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Anton", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        hand: ["var(--font-hand)", "Permanent Marker", "cursive"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
