/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        animus: {
          void: "#06090e",
          dark: "#0b111c",
          surface: "#101927",
          border: "#1e2f47",
          cyan: "#00F0FF",
          cyanGlow: "rgba(0, 240, 255, 0.25)",
          red: "#ef4444",
          gold: "#eab308",
          silver: "#94a3b8",
          white: "#f8fafc"
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'glitch': 'glitch 0.4s infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spinReverse 14s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.8))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}
