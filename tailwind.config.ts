import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["p22-mackinac-pro", "serif"],
        sans: ['var(--font-outfit)'],
      },
      colors: {
        background: "#ffffff",
        foreground: "#222222",
        grey: "#666666",
        green: "#00A68F",
        orange: "#F8984A"
      },
    },
  },
  plugins: [],
} satisfies Config;

