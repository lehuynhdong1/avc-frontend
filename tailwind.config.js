const { guessProductionMode } = require('@ngneat/tailwind');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  mode: 'jit',
  purge: {
    content: [
      './apps/**/*.{html,ts,css,scss,sass,less,styl}',
      './libs/**/*.{html,ts,css,scss,sass,less,styl}'
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        sidebar: '18rem'
      },
      height: {
        topbar: '4rem',
        main: 'calc(100vh - 4rem)'
      },
      colors: {
        primary: {
          DEFAULT: 'var(--tui-primary)',
          hover: 'var(--tui-primary-hover)',
          active: 'var(--tui-primary-active)'
        },
        secondary: {
          DEFAULT: 'var(--tui-secondary)',
          hover: 'var(--tui-secondary-hover)',
          active: 'var(--tui-secondary-active)'
        },
        accent: {
          DEFAULT: 'var(--tui-secondary)',
          hover: 'var(--tui-secondary-hover)',
          active: 'var(--tui-secondary-active)'
        }
      },
      spacing: {
        topbar: '4rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')]
};
