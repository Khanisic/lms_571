import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blood': '#E53B45',
        'secondary': '#A1BBDE',
        'dark': '#111111',
        'darker': '#28292C'
      },
      fontFamily: {
        'funky': ["Jockey One"],
        'chill': ["Inria Sans"]
      }
    },
  },
  plugins: [],
};
export default config;
