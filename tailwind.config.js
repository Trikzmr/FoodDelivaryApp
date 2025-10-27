/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",        // your main app file
    "./src/**/*.{js,jsx,ts,tsx}",   // all components inside src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E90FF", // Sky Blue
        secondary: "#0D47A1",
        accent: "#FBB13C",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
