/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom midcentury colors
        'midcentury': {
          orange: '#e27d60',
          teal: '#085f63', 
          cream: '#f8f4e3',
          warmgray: '#8d786a',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}