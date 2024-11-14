import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                customFontFamily: ["Inter", "sans-serif"],
            }
        },
    },
    daisyui: {
        themes: [],
    },
    plugins: [
        daisyui,
    ],

}