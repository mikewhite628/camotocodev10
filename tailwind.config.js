/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      stencil: "postnobillscolumbo",
      bangers: "Bangers",
      ropa: "Ropa Sans",
    },
    extend: {
      backgroundImage: {
        "camo-pattern": "url(../public/base-snow.png)",
      },
    },
  },
  plugins: [],
};
