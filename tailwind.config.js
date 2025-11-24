/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // important: enables manual toggling
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
      },},
  },
  plugins: [],
}
