/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
module.exports = {
	mode: "jit",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				"primary-green": "#157F1F",
				"primary-green-2": "#116a19",
				"primary-black": "#1C1917",
				"primary-red": "#A8201A",
				"primary-red-2": "#8D1C16",
				"primary-grey-light": "#A8A29E",
				"primary-brown-2": "#57534E",
				"primary-white": "#eceaea",
				"primary-brown": "#292524",

				"secondary-yellow": "#FFFC99",
			},
			keyframes: {
				loader: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
			},
			animation: { "spin-loader": "loader 1.2s linear infinite" },
		},
	},
	plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					"animation-delay": (value) => {
						return {
							"animation-delay": value,
						};
					},
				},
				{
					values: theme("transitionDelay"),
				}
			);
		}),
	],
};
