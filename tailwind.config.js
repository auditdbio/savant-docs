module.exports = {
  corePlugins: {
    preflight: true,
    container: true,
  },
  content: ["./src/**/*.{jsx,js,tsx,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00', // orange for important buttons
          hover: '#E65D00',   // slightly darker orange for hover states
        },
        secondary: {
          DEFAULT: 'rgb(82, 23, 109)', // purple for headings and less important elements
          hover: 'rgb(71, 20, 95)',    // slightly darker purple for hover states
        }
      },
      screens: {
        'xs': { 'min': '480px' },
        '3xl': { 'min': '1920px' },
        '4xl': { 'min': '2560px' },
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
