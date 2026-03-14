import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f5f7fb",
          dark: "#050816"
        },
        card: {
          light: "rgba(255, 255, 255, 0.8)",
          dark: "rgba(15, 23, 42, 0.9)"
        }
      },
      boxShadow: {
        glass: "0 20px 45px rgba(15, 23, 42, 0.25)"
      },
      borderRadius: {
        "3xl": "1.75rem"
      },
      backdropBlur: {
        glass: "18px"
      }
    }
  },
  plugins: []
};

export default config;

