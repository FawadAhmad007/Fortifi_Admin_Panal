import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#A700E6",
          foreground: "#FFFFFF",
          50: "#F9E6FF",
          100: "#F0CCFF",
          200: "#E299FF",
          300: "#D466FF",
          400: "#C633FF",
          500: "#A700E6",
          600: "#8500B3",
          700: "#630080",
          800: "#42004D",
          900: "#21001A",
        },
        secondary: {
          DEFAULT: "#1E1E2D",
          foreground: "#FFFFFF",
          50: "#6B6B8E",
          100: "#5D5D7D",
          200: "#4F4F6B",
          300: "#41415A",
          400: "#333348",
          500: "#1E1E2D",
          600: "#18181F",
          700: "#121218",
          800: "#0C0C10",
          900: "#060608",
        },
        destructive: {
          DEFAULT: "#FF3B5F",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#00E396",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FEB019",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "crypto-pattern": "url('/placeholder.svg?height=200&width=200')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

