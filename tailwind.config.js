/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1400px'
    },
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)']
      },
      colors: {
        gray: {
          100: 'hsl(227 32% 98%)',
          200: 'hsl(227 33% 93%)',
          300: 'hsl(227 26% 86%)',
          400: 'hsl(227 17% 62%)',
          500: 'hsl(227 41% 32%)',
          600: 'hsl(227 33% 22%)',
          700: 'hsl(227 27% 13%)',
          800: 'hsl(217 22% 7%)'
        },
        purple: {
          100: 'hsl(241 54% 68%)',
          200: 'hsl(241 50% 32%)',
          gradient: 'hsl(241 83% 77%)'
        },
        green: {
          100: 'hsl(187 47% 53%)',
          200: 'hsl(191 48% 28%)',
          300: 'hsl(194 72% 14%)',
          gradient: 'hsl(176 47% 66%)'
        }
      },
      lineHeight: {
        tall: '160%',
        normal: '140%'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
