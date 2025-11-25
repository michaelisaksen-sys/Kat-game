/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-cream': '#FFF8E7',
        'ghibli-brown': '#8B7355',
        'ghibli-green': '#9FB88E',
        'ghibli-gold': '#F4D03F',
      },
      fontFamily: {
        'ghibli': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
