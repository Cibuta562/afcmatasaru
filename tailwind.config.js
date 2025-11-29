/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                clubPrimary: '#e11d48',
                clubSecondary: '#053098',
            }
        },
    },
    plugins: [],
}