import React from "react";

const PaletteCard = ({ paletteInfo }) => {
	const ImageContainer = (
		<div className="relative w-64 min-w-64">
			<img
				className="absolute object-cover object-center w-full h-full"
				src={paletteInfo.imgUrl}
				alt={paletteInfo.name}
			/>
		</div>
	);

	const InfoContainer = (
		<div className="flex flex-col justify-center mx-auto text-secondary w-fit">
			<p>{paletteInfo.name}</p>
			<p>{paletteInfo.date}</p>
		</div>
	);

	const PaletteContainer = (
		<div className="flex flex-col items-center justify-center">
			<div className="flex items-center justify-center w-full p-2 space-x-2 max-w-90">
				{paletteInfo.palette.map((color, index) => (
					<div
						key={index}
						className="w-20 h-20 rounded-full"
						style={{ backgroundColor: color }}
					/>
				))}
			</div>
			<div className="flex flex-row">
				<button className="p-2 m-2 transition border rounded-md bg-primary text-info border-primary hover:text-primary hover:bg-info">copy palette</button>
				<button className="p-2 m-2 transition border rounded-md bg-primary text-info border-primary hover:text-primary hover:bg-info">edit palette</button>
			</div>
		</div>
	);

	return (
		<div className="flex flex-row h-48 max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
			<div className="flex flex-row w-full">
				{ImageContainer}
				{InfoContainer}
			</div>
			{PaletteContainer}
		</div>
	);
};

export default PaletteCard;
