/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        accent: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f8f8f8',
          300: '#e0e0e0',
          400: '#b8b8b8',
          500: '#8c8c8c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Inter', 'system-ui', 'sans-serif']
      },
      blur: {
        xs: '2px',
        '2xl': '64px',
        '3xl': '96px'
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'glass-lg': '0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)',
        glow: '0 0 20px rgba(239, 68, 68, 0.4)',
        'glow-lg': '0 0 30px rgba(239, 68, 68, 0.6)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(239, 68, 68, 0.7)' }
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.25), 0 0 40px transparent',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.45), 0 0 60px rgba(239, 68, 68, 0.2)',
            transform: 'scale(1.02)'
          }
        }
      }
    }
  },
  plugins: []
};
