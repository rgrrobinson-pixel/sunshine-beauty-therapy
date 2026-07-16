import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f2",
          100: "#e6ede2",
          200: "#cdd9c6",
          300: "#a8bd9d",
          400: "#7f9c73",
          500: "#5a7a5c", // brand / theme-color
          600: "#4a6a4d",
          700: "#3f5941",
          800: "#334736",
          900: "#2b3a2d",
        },
        cream: {
          50: "#fdfcf9",
          100: "#faf8f3",
          200: "#f3efe4",
        },
        ink: "#2d2b25",
        gold: "#c9a876",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
