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
          100: 'hsl(var(--gray-100))',
          200: 'hsl(var(--gray-200))',
          300: 'hsl(var(--gray-300))',
          400: 'hsl(var(--gray-400))',
          500: 'hsl(var(--gray-500))',
          600: 'hsl(var(--gray-600))',
          700: 'hsl(var(--gray-700))',
          800: 'hsl(var(--gray-800))'
        },
        purple: {
          100: 'hsl(var(--purple-100))',
          200: 'hsl(var(--purple-200))',
          gradient: 'hsl(var(--purple-gradient))'
        },
        green: {
          100: 'hsl(var(--green-100))',
          200: 'hsl(var(--green-200))',
          300: 'hsl(var(--green-300))',
          gradient: 'hsl(var(--green-gradient))'
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
