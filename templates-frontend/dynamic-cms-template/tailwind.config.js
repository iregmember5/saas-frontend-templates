/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
          neutral: "var(--color-neutral)",
          background: "var(--color-background)",
          text: "var(--color-text)",
        },
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 15s ease infinite",
      },
    },
  },
  plugins: [],
};
