export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.VITE_APP_MODE === "prod" ? { cssnano: {} } : {}),
  },
}
