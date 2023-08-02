/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'totk-green': '#1B443C',
        'totk-green-light': '#41a390',
      },
      backgroundImage: {
        'hero-pattern': "url('assets/seamless-bg.png')",
      }
    },
  },
  plugins: [require("daisyui")],
}

