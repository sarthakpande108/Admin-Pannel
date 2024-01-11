/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    fontSize: {
      xxs: "10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "22px",
      xxl: "25px",
      xxxl: "33px",
    },
    colors: {
      primary: "#3F83F8",
      "primary-light": "#EBF5FF",
      secondary: "#2B447F",
      "body-gray": "#F3F4F6",
      gray: "#9CA3AF",
    },

    extend: {
      fontFamily: {
        poppins: "font-family: 'Poppins', sans-serif;",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
