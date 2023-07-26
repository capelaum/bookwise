/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
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
      colors: {
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)'
        },
        purple: {
          100: 'var(--purple-100)',
          200: 'var(--purple-200)',
          gradient: 'var(--purple-gradient)'
        },
        green: {
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          gradient: 'var(--green-gradient)'
        }
      },
      lineHeight: {
        tall: '160%',
        normal: '140%'
      }
    }
  },
  plugins: []
}
