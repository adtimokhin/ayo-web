/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D2001A",
        secondary: "#FF1744",
        gray: "#DADEED",
        peach: "#f7a399",
      },
      fontFamily: {
        display: ["Lalezar", "cursive"],
        body: [ "Mulish","Montserrat Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
