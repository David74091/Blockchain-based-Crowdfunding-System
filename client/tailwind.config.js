/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    animationFillMode: {
      forwards: "forwards",
    },
    //
    animation: {
      "fade-in-from-left-forwards":
        "fadeInFromLeftForwards 1s ease-out forwards",

      "fade-in-forwards": "fadeInForwards 1.5s ease-out forwards",
      "fade-in-from-left": "fadeInFromLeft 1s ease-out",
      "fade-in": "fadeIn 1s ease-out",
      "fade-in-from-left": "fadeInFromLeft 1s ease-out",
    },
    keyframes: {
      fadeInFromLeftForwards: {
        "0%": { opacity: "0", transform: "translateX(-50px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      fadeInForwards: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      fadeInFromLeft: {
        "0%": { opacity: "0", transform: "translateX(-50px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
    },

    extend: {
      transform: ["responsive"],
      skew: ["responsive"],
      backgroundColor: {
        primary: "#65C3C8",
        secondary: "#EF9FBC",
        accent: "#EEAF3A",
        neutral: "#291334",
        "base-100": "#FAF7F5",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
      textColor: {
        primary: "#65C3C8",
        secondary: "#EF9FBC",
        accent: "#EEAF3A",
        neutral: "#291334",
        "base-100": "#FAF7F5",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
      borderColor: {
        primary: "#65C3C8",
        secondary: "#EF9FBC",
        accent: "#EEAF3A",
        neutral: "#291334",
        "base-100": "#FAF7F5",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
      daisyui: {
        themes: [
          {
            mytheme: {
              primary: "#65C3C8",
              secondary: "#EF9FBC",
              accent: "#EEAF3A",
              neutral: "#291334",
              "base-100": "#FAF7F5",
              info: "#3ABFF8",
              success: "#36D399",
              warning: "#FBBD23",
              error: "#F87272",
            },
          },
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
