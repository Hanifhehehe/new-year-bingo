import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5841',      // Sunset orange
        secondary: '#1D1842',    // Deep purple
        background: '#FFFFFF',   // White
        'background-alt': '#E9F1FA', // Light blue
        border: '#00ABE4',       // Bright blue
        'button-hover': '#FDA1A2', // Light pink
        button: '#FF5841',       // Sunset orange (same as primary)
        text: '#1D1842',         // Deep purple (same as secondary)
        'text-dark': '#000000',  // Black
      },
    },
  },
  plugins: [],
} satisfies Config;
