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
		date: "11/11/1994",
		palette: ["#1c0e16", "#f96b20", "#cf342e", "#000000", "#7a2c34"],
		imgUrl:
			"https://images.unsplash.com/photo-1614878488982-32dbaad50fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
	},
];

const Dashpane = () => {
	return (
		<div className="w-full p-10">
			<h1 className="text-primary text-[72px] my-8">Madison's Dashboard</h1>
			{testInfo.length === 0 ? (
				<div className="flex justify-center">
					<div className="flex flex-col items-center p-4 text-center border-2 border-dashed rounded-lg border-shade w-96">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-24 h-24"
							viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								fill="#A0AEC0"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="text-2xl text-shade">No Palettes</p>
						<p className="my-4 text-sm text-shade">
							Get started by adding a new image from the navbar
						</p>
					</div>
				</div>
			) : (
				testInfo.map((palette, id) => (
					<div className="my-4" key={id}>
						<PaletteCard paletteInfo={palette} />
					</div>
				))
			)}
		</div>
	);
};

export default Dashpane;
