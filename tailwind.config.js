/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      josefin: ["Josefin Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
