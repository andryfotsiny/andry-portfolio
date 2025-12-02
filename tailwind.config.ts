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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			military: [
  				'Orbitron',
  				'sans-serif'
  			],
  			tech: [
  				'Share Tech Mono',
  				'monospace'
  			]
  		},
  		animation: {
  			scan: 'scan 2s ease-in-out infinite',
  			glitch: 'glitch 1s ease-in-out infinite',
  			'pulse-slow': 'pulse 4s ease-in-out infinite',
  			float: 'float 6s ease-in-out infinite'
  		},
  		keyframes: {
  			scan: {
  				'0%, 100%': {
  					transform: 'translateY(0)',
  					opacity: '0'
  				},
  				'50%': {
  					transform: 'translateY(100%)',
  					opacity: '0.5'
  				}
  			},
  			glitch: {
  				'0%, 100%': {
  					transform: 'translate(0)'
  				},
  				'33%': {
  					transform: 'translate(-5px, 2px)'
  				},
  				'66%': {
  					transform: 'translate(5px, -2px)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			}
  		},
  		backdropFilter: {
  			glass: 'blur(10px)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;