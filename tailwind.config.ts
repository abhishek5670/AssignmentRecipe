import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',    // Main background color
        surface: '#F8F9FA',      // Secondary background (cards, sections)
        primary: '#22C55E',      // Primary action color (buttons, links)
        accent: '#F97316',       // Accent color (highlights, icons)
        text: {
          primary: '#1F2937',    // Main text color
          secondary: '#6B7280',  // Secondary text color
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
