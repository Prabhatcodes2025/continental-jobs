import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#07111f",
        ink: "#0b1526",
        royal: "#0b3d68",
        gold: "#d9a441",
        champagne: "#f7edd3"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(217, 164, 65, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
