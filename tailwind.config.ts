import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,html}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
      'white-tab': '#ECECEC',
      'green-tab': '#66E9C6',
      'error-color': '#FF6347',
    },
    extend: {},
  },
  plugins: [],
};
export default config;
