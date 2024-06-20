/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {

    fontFamily: {
      "sans": ["Inter", "sans-serif"],
    },

    extend: {
      colors: {
        "pastel-green": {
          500: "#54b032",
          700: "#326b20",
          100: "#ddf5d2",
        },
        "carnation": {
          500: "#f83b3b",
          400: "#ff5757",
          100: "#ffe1e1",
        },
        "woodsmoke": {
          950: "#171717",
          975: "#1d1d1d",
          900: "#252525",
          800: "#2b2b2b",
          700: "#343434",
          600: "#3C3C3C",
          400: "#AAAAAA",
          50: "#FFFFFF",
        },
        "royal-blue": {
          950: "#1a1f4c",
          900: "#2c3783",
          800: "#2e3aa5",
          700: "#3542cd",
          600: "#4354e8",
          500: "#526ff3",
          400: "#7f9efa",
          300: "#a3c1fe",
          200: "#c6daff",
          100: "#dfecff",
          50: "#eef5ff",
        },
        "royal-green": {
          950: "#00341d",
          900: "#0b5c38",
          800: "#0b7041",
          700: "#068f4e",
          600: "#02b761",
          500: "#0bdc79",
          400: "#4bf4a3",
          300: "#77febd",
          200: "#b3ffd9",
          100: "#d8ffec",
          50: "#eefff6",
        },
      },

    }
  },
}