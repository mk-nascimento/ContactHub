/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        grey: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#303030',
          800: '#202020',
          900: '#101010',
        },
        brand: {
          neutral: '#7F7767',
          100: '#9AB4A6',
          200: '#73A695',
          300: '#204943',
        },
        input: { alert: '#FF3D00' },
      },
      fontFamily: {
        sans: ['Red Hat Display', 'sans-serif'],
      },
      cursor: {
        pointer: 'pointer',
      },
    },
  },
  variants: { scrollbar: ['rounded'] },
  plugins: [],
};
