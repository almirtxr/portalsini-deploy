import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ── Marca Portal Sîni ──
        brand: {
          red: "#BB1832",
          tan: "#C78A47",
          yellow: "#F9C45D",
        },
        ink: "#121212",
        paper: "#FFFFFF",
        // Compatibilidade com componentes shadcn existentes
        primary: { DEFAULT: "#BB1832", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#C78A47", foreground: "#FFFFFF" },
        accent: { DEFAULT: "#F9C45D", foreground: "#000000" },
        card: { DEFAULT: "#FFFFFF", foreground: "#000000" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Archivo", "Inter", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
