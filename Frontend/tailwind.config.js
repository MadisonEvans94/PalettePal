/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3490dc", // Replace with your primary color
				secondary: "#ffed4a", // Replace with your secondary color
				accent: "#f9ac00", // Replace with your accent color
				theme1: "#FF8595",
				neutral: {
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					// Add more shades as needed
				},
				info: "#555555",
				success: "#38c172",
				error: "#e3342f",
				warning: "#f6993f",
			},
			fontFamily: {
				sans: ["Open Sans", "sans-serif"], // Replace with your primary font
				serif: ["Merriweather", "serif"], // Replace with your secondary font
			},
			spacing: {
				1: "8px",
				2: "12px",
				3: "16px",
				4: "24px",
				5: "32px",
				6: "48px",
				// Add more spacing as needed
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
			// Add additional customizations as needed
		},
	},
	plugins: ["@tailwindcss/forms"],
};
