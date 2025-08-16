/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7A3B69",
          light: "#9A879D",
          dark: "#563440",
        },
        white: "#D7DEDC",
        semiwhite: "#CFCFCD",
        black: "#191919",
      },
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        neumorphic: `
      inset -15px 15px 30px 0 rgba(208,208,208,0.2),
      inset 15px -15px 30px 0 rgba(208,208,208,0.2),
      inset -15px -15px 30px 0 rgba(255,255,255,0.9),
      inset 15px 15px 38px 0 rgba(208,208,208,0.9)
    `,
      },
    },
  },
  plugins: [],
};

