/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          "accent-dark": "var(--accent-dark)",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          caveat: ["Caveat", "cursive"],
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  
  