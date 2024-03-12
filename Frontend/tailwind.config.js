/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3490dc",
				secondary: "#ffed4a",
				accent: "#f9ac00",
				theme1: "#FF8595",
				dark: "#2A2A2A",
				dim: "#4A4A4A",
				faint: "#777",
				neutral: {
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
				},
				info: "#555555",
				success: "#38c172",
				error: "#e3342f",
				warning: "#f6993f",
			},
			fontFamily: {
				sans: ["Open Sans", "sans-serif"],
				serif: ["Merriweather", "serif"],
			},
			spacing: {
				1: "8px",
				2: "12px",
				3: "16px",
				4: "24px",
				5: "32px",
				6: "48px",
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
		},
	},
	plugins: ["@tailwindcss/forms"],
};
