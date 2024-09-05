import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryC': '#64B5F6',
        'backgroundC' : 'white',
        'buttonsC' : '#EC6F53',
        'darkC' : '#000000' 
      },
      zIndex: {
        '1000' : '1000',
      }
    },
  },
  plugins: [],
};
export default config;
