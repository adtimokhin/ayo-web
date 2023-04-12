/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A237E",
        secondary: "#FF1744",
        gray: "#E0E0E0",
        peach: "#f7a399"
      },
      fontFamily: {
        display: ['"Major Mono Display"', 'monospace'],
        body: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
