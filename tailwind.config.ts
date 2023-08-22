export default {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        transparent: "transparent",
        "bgColor": "#EAF4F4",
        "bgDarkColor": '#0A0F17',
        "bgDark": '#232c31',
        "strokeColor": "#ced4da",
        "white": "#FFFFFF",
        "paragraphColor": "#6c757d",
        "headingColor": "#343a40",
        "lightGray": "#F2F2F2",
        "doveGrey": "#6D6D6D",
        "vampireGrey": "#525252",
        "dark": "#26293C",
        "gray": "#808080",
        "success": "#00C851",
        "danger": "#FF5252",
        "warning": "#FFEB3B",
        "info": "#2196F3",
        "light": "#F2F2F2",
        "dark-gray": "#8e8e8e",
        "soft-peach": "#efefef",
        "platinum": "#e4e4e4",
        "gainSboro": "#DBDDDF"
      },
    }
  },
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/*.vue',
    './pages/**/*.vue',
    './pages/**/**/*.vue',
    './pages/**/**/**/*.vue',
    './composables/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'class',
  cssPath: '~/assets/css/tailwind.css'
}