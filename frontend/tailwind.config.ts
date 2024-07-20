import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#BBC3DD",
          "primary-content": "#000000",
          secondary: "#AADDD4",
          neutral: "#000000",
          info: "#7886BC",
          "info-content": "#ffffff",
          accent: "#344a9a",
          warning: "ffe863",
          success: "#00997d",
          "the-blue": "#0000000",
          "success-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#dde1ee",
          "base-300": "#344A9A",
          "base-content": "#ffffff",
        },
      },
      "winter",
    ],
  },
};
export default config;
