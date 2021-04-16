import { darken, lighten } from "polished";

export type ThemeType = typeof theme;

const primaryColor = '#4579db'
const secondaryColor = '#dbb145'

export const theme = {
    variable: {
        headerHeight: '120px'
    },
    color: {
        primary: {
            main: primaryColor,
            light: `${lighten(0.1, primaryColor)}`,
            dark: `${darken(0.1, primaryColor)}`
        },
        secondary: {
            main: secondaryColor,
            light: `${lighten(0.1, secondaryColor)}`,
            dark: `${darken(0.1, secondaryColor)}`
        },
        grey: {
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
        black: '#1a1a1a',
        white: '#e9e9e9',
        error: '#db4545',
    },
    font: {
        source: `https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto&display=swap`,
        family: {
            default: `'Roboto', sans-serif;`,
            montserrat: `'Montserrat', sans-serif;`
        },
        size: {
            s3: '0.512rem', // 8.19px
            s2: '0.64rem', // 10.24px
            s1: '0.8rem', // 12.80px
            default: '16px', // https://type-scale.com/ - Major third
            b1: '1.25rem', // 20.00px
            b2: '1.563rem', // 25.00px
            b3: '1.953rem', // 31.25px
            b4: '2.441rem', // 39.06px
            b5: '3.052rem' // 48.83px
        }
    },
    shadow: {
        0: 'none',
        1: '2px 2px 5px rgba(0,0,0,0.2)',
        2: '2px 2px 6px rgba(0,0,0,0.2)',
        3: '2px 2px 7px rgba(0,0,0,0.2)',
        4: '3px 3px 8px rgba(0,0,0,0.5)',
    },
    effect: {
        glow: `drop-shadow(0px 0px 5px ${primaryColor})`
    },
    mediaQuery: {
        mobileS: '320px',
        mobileM: '375px',
        mobileL: '425px',
        tablet: '768px',
        laptop: '1024px',
        laptopL: '1440px',
        fourK: '2560px',
    }
};