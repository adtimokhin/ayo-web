/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D2001A",
        secondary: "#FE6244",
        red: "#FFDEB9",
        orange1: "#FE6244",
        background: "#5F29C7",
        yellow: "#FFDE00",
      },
      fontFamily: {
        display: ["Lalezar", "cursive"],
        logo: ["Artifex Cf"],
        body: [ "Mulish","Montserrat Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};

// To run the website localy type: npm run dev
