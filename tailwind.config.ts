import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-blanc': '#FFFFFF',
        'neon-green': '#39ff14',
        'dark-gray': '#1a1a1a',
        'darker-gray': '#0a0a0a',
        'tech-gray': '#2a2a2a',
      },
      fontFamily: {
        military: ['Orbitron', 'sans-serif'],
        tech: ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'scan': 'scan 2s ease-in-out infinite',
        'glitch': 'glitch 1s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '0.5' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;