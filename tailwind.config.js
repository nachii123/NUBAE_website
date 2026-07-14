/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      cream: '#FAF8F3',
      beige: '#E8E2D5',
      taupe: '#A89968',
      sage: '#8B9B8F',
      charcoal: '#2C2C2C',
      stone: {
        DEFAULT: '#D4C5B9',
        50: '#F5F2EE',
        100: '#E8DFD6',
        200: '#D4C5B9',
        300: '#C0AB9C',
        400: '#AC917F',
        500: '#997762',
      },
      red: '#EF4444',
    },
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      sans: ['Inter', 'sans-serif'],
    },
    fontSize: {
      'xs': ['12px', '16px'],
      'sm': ['14px', '20px'],
      'base': ['16px', '24px'],
      'lg': ['18px', '28px'],
      'xl': ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px', '40px'],
      '4xl': ['48px', '56px'],
      '5xl': ['64px', '72px'],
      '6xl': ['72px', '80px'],
    },
    extend: {
      spacing: {
        '128': '32rem',
      },
      maxWidth: {
        'container': '1600px',
      },
    },
  },
  plugins: [],
}

