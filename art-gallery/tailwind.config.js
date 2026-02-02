/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme - inspired by Calgary Art Gallery
        background: "#FAFAFA",
        foreground: "#0B090A",
        
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0B090A",
        },
        
        // Primary - Dark for buttons
        primary: {
          DEFAULT: "#0B090A",
          foreground: "#FFFFFF",
        },
        
        // Secondary
        secondary: {
          DEFAULT: "#F5F5F5",
          foreground: "#0B090A",
        },
        
        // Muted
        muted: {
          DEFAULT: "#E5E5E5",
          foreground: "#737373",
        },
        
        // Accent - Orange/Red for highlights
        accent: {
          DEFAULT: "#E85D04",
          foreground: "#FFFFFF",
        },
        
        border: "#E5E5E5",
        input: "#E5E5E5",
        ring: "#E85D04",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
}
