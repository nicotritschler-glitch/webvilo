/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6464',
          500: '#fe3232',
          600: '#ed1414',
          700: '#c70808',
          800: '#9b1c1c',
          900: '#801818',
          950: '#460808',
        },
        forest: {
          50:  '#f0fdf4',
          100: '#d8f3dc',
          200: '#b4e6bc',
          300: '#7fd092',
          400: '#4bb663',
          500: '#2d9b47',
          600: '#1f7c35',
          700: '#1a622b',
          800: '#1b4332',
          900: '#0d2818',
          950: '#071510',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
