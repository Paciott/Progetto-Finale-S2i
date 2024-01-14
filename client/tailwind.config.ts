import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        purplepink: "#ff006e",
        darkpurple: "#ce0268",
        blue: "#0096c7",
        brightYellow: "#fcbf49",
        white: "#f7f5f6",
        whiter: "#f8fafc",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      padding: {
        "custom-15rem": "15rem",
      },
      outline: {
        "custom-outline": "outline-offset: 2px;",
      },
      maxHeight: {
        "custom-height": "55rem",
      },
    },
  },
  plugins: [],
};
export default config;
