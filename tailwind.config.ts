import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-blue": "#042a5c",
        "light-blue": "#063c84",
        primary: "#ff7c00",
        "primary-dark": "#c2410c",
        "primary-light": "#ff7c00",
        "primary-extra-light": "#ffedd5",
      },
    },
  },
  plugins: [],
};
export default config;
