/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
        accent: "#10b981",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
