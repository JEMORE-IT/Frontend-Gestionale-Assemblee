/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: "320px",
      tablet: "696px",
      laptop: "1080px",
      notebook: "1366px",
      desktop: "1920px",
    },
    extend: {
      colors: {
        "light-blue": "#2E8CAD",
      },
      backgroundColor : {
        "color" : "black"
      },
    },
  },
  plugins: [],
};
