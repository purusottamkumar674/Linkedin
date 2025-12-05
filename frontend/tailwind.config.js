// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Colors (LinkedIn-Inspired)
      colors: {
        // Primary brand color (LinkedIn Blue)
        primary: {
          DEFAULT: '#0077B5', // Darker Blue for Buttons/Accents
          dark: '#004182',
        },
        // Secondary color for Navbar background (Light Gray/White)
        secondary: {
          DEFAULT: '#ffffff', // White
          light: '#F3F2EF', // Light background for the main content area
        },
        // Neutral text/icon color (Darker for readability)
        neutral: {
          DEFAULT: '#666666', // Medium Gray for icons/inactive text
          dark: '#000000', // Black for main headings/active text
        },
        // Accent color for highlights
        accent: '#E6B93F', // Yellow/Gold
      },
      // Custom Font (Optional: Use a professional font)
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif'], // Import this font in your main CSS file
      },
    },
  },
  plugins: [],
}