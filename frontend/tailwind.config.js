/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000ff',
        surface: '#1e293b',
        primary: '#7b9bcdff',
        secondary: '#0ea5e9',
        text: '#f8fafc',
        muted: '#94a3b8',
        notebg: '#d1dbe1ff',
        notetext: '#5672b4ff',
      }
    },
  },
  plugins: [],
}
