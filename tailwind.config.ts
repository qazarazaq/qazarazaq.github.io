import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      colors: {
        ink: "#080705",
        ivory: "#f4efe7",
        paper: "#fbf8f2",
        brass: "#b08a4a",
        banking: "#123d5a",
        skyline: "#8fb8ff",
      },
      boxShadow: {
        editorial: "0 28px 90px rgba(10, 9, 7, 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
