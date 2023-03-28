/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-default": "#EFEDE4",
      "primary-focus": "#E0DDCD",
      "secondary-default": "#252827",
      "secondary-focus": "#434746",
      "alert-dark": "#E11D48",
      "alert-light": "#FB7185",
      "warning-dark": "#D97706",
      "warning-light": "#F59E0B",
      "success-dark": "#0D9488",
      "success-light": "#2DD4BF",
      white: "#ffffff",
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
      none: "0px 0px",
    },
    screens: {
      sm: "404px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    borderWidth: {
      lg: "3px",
      md: "2.5px",
      sm: "2px",
    },
    lineHeight: {
      sm: "1",
      md: "1.3",
      lg: "1.5",
    },
    extend: {
      maxWidth: {
        "screenwidth-lg": "1120px",
        "screenwidth-md": "704px",
        // "screenwidth-sm": "608px",
      },
    },
  },
  plugins: [],
}
