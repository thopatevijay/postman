import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#63b3ed', // light blue
          DEFAULT: '#1d4ed8', // blue
          dark: '#1e3a8a', // dark blue
        },
        secondary: {
          light: '#a3a3a3', // light gray
          DEFAULT: '#6b7280', // gray
          dark: '#4b5563', // dark gray
        },
        accent: {
          light: '#34d399', // light green
          DEFAULT: '#10b981', // green
          dark: '#047857', // dark green
        },
        background: {
          light: '#f3f4f6', // light background
          DEFAULT: '#e5e7eb', // default background
          dark: '#d1d5db', // dark background
        },
        text: {
          light: '#9ca3af', // light text
          DEFAULT: '#374151', // default text
          dark: '#1f2937', // dark text
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
