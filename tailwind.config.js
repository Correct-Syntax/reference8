/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },  
    extend: {
      colors: {
        dark: {
          700: "#24272C",
          800: "#15191C",
          900: "#0B0C0D",
        }
      }
    },
  },
  plugins: [],
}

