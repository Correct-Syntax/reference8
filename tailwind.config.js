/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        accent: "#DADD15",
        gray: "#C2C2C2",
        background: "#15191C",
        foreground: "#0B0C0D",
      },
    },
  },
  plugins: [],
};
