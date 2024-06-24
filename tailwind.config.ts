import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,html}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-background': '#1F1F1F',
        'secondary-background': '#2A2A2A',
        'logo-grey': '#DEDEDE',
        'logo-green': '#1DE0AC',
        'menu-black': '#282828',
        'menu-grey': '#939393',
        'menu-grey-secondary': '#565656',
        'green-screen': '#00B140',
        'grey-tab': '#3A3A3A',
        'main-white': '#FFFFFF',
        'white-tab': '#ECECEC',
        'green-tab': '#66E9C6',
        'error-color': '#FF6347',
        'green-button': '#007D5C',
        'green-border': '#009970',

        // themes
        'snow-white': '#FFF',
        'message-blue': '#1F8AFF',
        'forest-green': '#283618',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        japanese: ['Natoto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
