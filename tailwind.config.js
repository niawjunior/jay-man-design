/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-1": 'url("/src/assets/bg-1.png")',
        "bg-2": 'url("/src/assets/bg-2.png")',
        "bg-3": 'url("/src/assets/bg-3.png")',
      },
    },
  },
  plugins: [],
}
