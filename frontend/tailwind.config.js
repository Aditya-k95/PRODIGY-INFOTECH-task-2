/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: {
          DEFAULT: '#F2F7F9',
          50: '#FFFFFF',
          100: '#F8FBFC',
          200: '#F2F7F9',
          300: '#E2ECF0',
          400: '#CADBE2',
        },
        'dusty-teal': {
          DEFAULT: '#89C9C9',
          50: '#F0F9F9',
          100: '#E1F3F3',
          200: '#BEE3E3',
          300: '#89C9C9',
          400: '#67B4B4',
          500: '#489A9A',
          600: '#357C7C',
        },
        'soft-lime': {
          DEFAULT: '#DAFC92',
          50: '#FAFEF2',
          100: '#F4FDE5',
          200: '#E9FCC6',
          300: '#DAFC92',
          400: '#C2F557',
          500: '#A4DC22',
        },
        holly: {
          DEFAULT: '#02261E',
          50: '#E6ECEB',
          100: '#C0D2CF',
          200: '#94B2AB',
          300: '#648F85',
          400: '#3E6F64',
          500: '#1F5448',
          600: '#144338',
          700: '#0B362D',
          800: '#052C23',
          900: '#02261E',
          surface: '#05372C',
          light: '#0A4E3F',
          muted: '#2D584D',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(2, 38, 30, 0.04)',
        'card': '0 4px 20px -2px rgba(2, 38, 30, 0.06)',
        'elevated': '0 12px 32px -4px rgba(2, 38, 30, 0.1)',
        'glow-lime': '0 0 20px rgba(218, 252, 146, 0.35)',
        'glow-teal': '0 0 20px rgba(137, 201, 201, 0.3)',
      },
      borderRadius: {
        'enterprise': '14px',
      },
    },
  },
  plugins: [],
}
