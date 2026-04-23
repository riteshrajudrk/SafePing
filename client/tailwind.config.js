/** @type {import('tailwindcss').config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        card: 'hsl(var(--card))',
        foreground: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
      },
    },
  },
  plugins: [],
}
