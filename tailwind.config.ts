import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['ClashDisplay', 'sans-serif'],
        secondary: ['AzeretMono', 'monospace'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "impacto-purple": {
          DEFAULT: "var(--impacto-purple)",
          light: "var(--impacto-purple-light)",
          lighter: "var(--impacto-purple-lighter)",
        },
        "impacto-gold": {
          DEFAULT: "var(--impacto-gold)",
        },
        "impacto-dark": {
          DEFAULT: "var(--impacto-dark)",
        },
        "impacto-light": {
          DEFAULT: "var(--impacto-light)",
        },
        'impacto-gold': '#cba135',
        'impacto-gold-light': '#e3c676',
        'impacto-purple': '#923fa8',
        'impacto-purple-light': '#b76fd0',
        'impacto-lavender': '#e9d5ff',
        'impacto-white': '#fff3f3',
        'impacto-dark': '#242424'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(146, 63, 168, 0.3)',
        'gold-glow': '0 0 15px rgba(203, 161, 53, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
