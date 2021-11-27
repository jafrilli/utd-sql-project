module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif']
      },
      colors: {
        'library-bg': '#FDE8C1',
        'library-text': '#AD6802',
      },
      height: {
         sm: '16px',
         md: '24px',
         lg: '48px',
         xl: '2300px',
              }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
