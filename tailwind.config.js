/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-lavender': '#C38EB4',
        'custom-white': '#E1CBD7',
        'custom-sky-blue': '#86ABCF',
        'custom-sea-green': '#26425A'
      },
      textColor: {
        'custom-lavender': '#C38EB4',
        'custom-white': '#E1CBD7',
        'custom-sky-blue': '#86ABCF',
        'custom-sea-green': '#26425A'
      }
    },
  },
  plugins: [require("daisyui")],
}

