/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0d9488", // teal-600
        ink: "#18181b",   // zinc-900
        paper: "#fafafa", // zinc-50
        accent: "#f97316" // orange-500
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }
    },
  },
  plugins: [],
}
