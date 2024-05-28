/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg_dark': '#000000',
        'accent_green_dark': '#20CC00',
        'accent_purple_dark': '#9400FF',
      }
    },
  },
  plugins: [],
}

