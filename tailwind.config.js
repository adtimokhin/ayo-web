/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D2001A",
        secondary: "#FFDE00",
        gray: "#FFFAE7",
        peach: "#EFEFEF",
      },
      fontFamily: {
        display: ["Lalezar", "cursive"],
        body: [ "Mulish","Montserrat Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
