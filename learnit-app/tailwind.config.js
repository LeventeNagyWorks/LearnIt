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
        'cstm_bg_dark': '#0f0f0f',
        'cstm_white': '#EEEEEE',
        'accent_green_dark': '#20CC00',

        'accent_purple_dark': '#9400FF',
        'accent_orange_dark': '#e58c23',
      }
    },
  },
  plugins: [],
}

