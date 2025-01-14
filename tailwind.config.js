/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'text-shadow': '2px 2px 5px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        "text-fade": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "text-fade": "text-fade 1s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
