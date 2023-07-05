import React from "react";
import PaletteCard from "../PaletteCard/PaletteCard";

const testInfo = [
	{
		name: "Building Photo",
		date: "11/17/1994",
		palette: ["#040505", "#475861", "#849da9", "#f7fafc", "#c1d5dd"],
		imgUrl:
			"https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
	},
	{
		name: "Orange Flowers",
		date: "11/17/1994",
		palette: ["#000000", "#de9510", "#5b9b9e", "#8c7b3a", "#0a84ae"],
		imgUrl:
			"https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
	},
	{
		name: "Building Photo",
		date: "11/17/1994",
		palette: ["#1c0e16", "#f96b20", "#cf342e", "#000000", "#7a2c34"],
		imgUrl:
			"https://images.unsplash.com/photo-1614878488982-32dbaad50fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
	},
];

const Dashpane = () => {
	return (
		<div className="w-full p-10">
			{testInfo.map((palette) => (
				<PaletteCard paletteInfo={palette} />
			))}
		</div>
	);
};

export default Dashpane;
