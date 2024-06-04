/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['poppins', 'sans-serif'],
        'poetsen': ['poetsen one', 'sans-serif']
      },
      colors: {
        'bg_dark': '#1D2D50',
        'bg_darker': '#172441',
        'bg_white': '#EEEEEE',
        'bg_white_darker': '#9DB2BF',
        'accent_green_dark': '#20CC00',

        'accent_purple_dark': '#9400FF',
        'accent_orange_dark': '#e58c23',
      }
    },
  },
  plugins: [],
}

