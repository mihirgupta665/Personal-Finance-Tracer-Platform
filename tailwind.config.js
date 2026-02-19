/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                // Integrating the custom colors I defined earlier as variables if needed, 
                // but Tailwind's default palette (slate, indigo, etc.) covers most of it.
            }
        },
    },
    plugins: [],
}
