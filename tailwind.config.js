/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ffe64a",
                hover: "#e3cd42",
                writing: "#ffffff",
                writingdark: "#9c9259",
                greeen: "#7A9D54",
                greeenhover: "#5f7a42",
                reed: "#D83F31",
                reedhover: "#b33529",
            },
            screens: {
                wdefined: "480px",
            },
        },
    },
    plugins: [],
}
