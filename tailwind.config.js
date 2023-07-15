/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#c54957",
				secondary: "#dc7955",
				success: "#59b447",
				info: "#FDFDFD",
				shade: "#B7B7B7",
				warning: "#d9822b",
				danger: "#dc3545",
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
			borderRadius: {
				none: "0",
				sm: "2px",
				DEFAULT: "4px",
				md: "6px",
				lg: "8px",
				full: "9999px",
			},
			boxShadow: {
				sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
				DEFAULT:
					"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
				md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				"2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
				"3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
				inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
				none: "none",
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
	plugins: [],
};
