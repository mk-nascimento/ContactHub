/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        'gray-50': '#f1f3f5',
        'gray-100': '#edf2f7',
        'gray-200': '#e2e8f0',
        'gray-300': '#cbd5e0',
        'gray-400': '#a0aec0',
        'gray-500': '#718096',
        'gray-600': '#4a5568',
        'gray-700': '#2d3748',
        'gray-900': '#212529',
        'gray-950': '#121214',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      cursor: {
        pointer: 'pointer',
      },
    },
  },
  variants: { scrollbar: ['rounded'] },
  plugins: [],
};
