/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        myshadow: "0 5px 20px rgba(87, 13, 248, 0.5)",
      },
      colors: {
        mycolor: "#570DF8",
      },
    },
  },
  plugins: [require("daisyui")],
};
