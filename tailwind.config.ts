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
        maroon: {
          950: "#0B0709",
          900: "#1F1315",
          800: "#2B1620",
          700: "#3D1A25",
          600: "#4A0E1A",
          500: "#631828",
        },
        marigold: {
          400: "#F5B85D",
          500: "#F2A33C",
          600: "#E58A2B",
          700: "#C66D1B",
        },
        gold: {
          200: "#F1D49B",
          300: "#E3C280",
          400: "#D4AF37",
          500: "#C9A227",
          600: "#A88344",
        },
        ivory: {
          100: "#FAF7F2",
          200: "#F6EFE3",
          300: "#EDE2D2",
        },
        blush: "#E7C9C2",
        sage: "#8A9A86",
      },
      fontFamily: {
        serif: ["Marcellus", "Cormorant Garamond", "Georgia", "serif"],
        devanagari: ["Tiro Devanagari Hindi", "serif"],
        sans: ["Inter", "Sora", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "float 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F1D49B 0%, #C9A227 50%, #A88344 100%)",
        "maroon-gradient": "linear-gradient(180deg, rgba(43,22,32,0.85) 0%, rgba(31,19,21,0.95) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
