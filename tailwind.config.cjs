/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-default": "#1fb6ff",
      "primary-focus": "#7e5bef",
      "secondary-default": "#ff49db",
      "secondary-focus": "#ff7849",
      "alert-dark": "#13ce66",
      "alert-light": "#ffc82c",
      "warning-dark": "#273444",
      "warning-light": "#8492a6",
      "success-dark": "#d3dce6",
      "success-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Alegreya Sans", "sans-serif"],
      serif: ["Bitter", "serif"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    boxShadow: {
      sm: "2px 2px 0px #434746",
      lg: "5px 5px 0px #434746",
    },
    extend: {
      maxWidth: {
        "screenwidth-lg": "1120px",
        "screenwidth-md": "704px",
        "screenwidth-sm": "608px",
      },
    },
  },
  plugins: [],
}
