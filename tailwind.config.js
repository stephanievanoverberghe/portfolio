const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
    "./pages/**/*.{html,js}",
    "./pages/*.{html,js}"
  ],
  theme: {
    // A l'extérieur, ça remplace les fonctionnalités se trouvant dans le thème tailwind
    extend: {
      // A l'intérieur, ça ajoute des fonctionnalités au thème tailwind sans rien écraser
      colors: {
        'red-pink': {
          50: '#fff1f3',
          100: '#ffe4e7',
          200: '#ffccd4',
          300: '#fea3b1',
          400: '#fd6f88',
          500: '#f73c63',
          600: '#d31848',
          700: '#c10f42',
          800: '#a1103d',
          900: '#8a113b',
          950: '#4d041c',
          1000: '#2C000F'
        }
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        Patua: ['Patua One', 'serif'],
      },
      boxShadow: {
        'dark-hover': 'inset -2px -2px 6px 0 #fd6f88, inset 2px 2px 6px 0 #2C000F, -2px -2px 6px 0 #fd6f88, 2px 2px 6px 0 #2C000F',
        'dark-default': '-2px -2px 6px 0 #fd6f88, 5px 5px 4px 0 #2C000F',
        'dark-pressed': 'inset -2px -2px 4px 0 #fd6f88, inset 3px 3px 4px 0 #2C000F',
        'light-hover': 'inset -4px -4px 4px 0 #fff, inset 2px 2px 6px 0 #D4C8CA, -2px -2px 6px 0 #fff, 2px 2px 6px 0 #D4C8CA',
        'light-default': ' -2px -2px 6px 0 #fff, 2px 2px 6px 0 #D4C8CA',
        'light-pressed': 'inset -2px -2px 4px 0 #fff, inset 2px 2px 6px 0 #D4C8CA',
        'shadow-header': '0 -2px 4px 0 #D4C8CA',
        'shadow-hero-dark': '-2px -2px 6px 0 #f73c63, 5px 5px 4px 0 #1C000F'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

