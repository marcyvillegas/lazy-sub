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
    },
    extend: {},
  },
  plugins: [],
};
export default config;
