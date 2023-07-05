import React from "react";

const PaletteCard = ({ paletteInfo }) => {
	const ImageContainer = (
		<div className="w-64 relative min-w-64">
			<img
				className="absolute h-full w-full object-cover object-center"
				src={paletteInfo.imgUrl}
				alt={paletteInfo.name}
			/>
		</div>
	);

	const InfoContainer = (
		<div className="mx-auto flex flex-col justify-center w-fit">
			<p>{paletteInfo.name}</p>
			<p>{paletteInfo.date}</p>
		</div>
	);

	const PaletteContainer = (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-90 justify-center items-center flex space-x-2 p-2">
				{paletteInfo.palette.map((color, index) => (
					<div
						key={index}
						className="h-20 w-20 rounded-full"
						style={{ backgroundColor: color }}
					/>
				))}
			</div>
			<div className="flex flex-row">
				<button className="border m-2 p-2 rounded-md">copy palette</button>
				<button className="border m-2 p-2 rounded-md">edit palette</button>
			</div>
		</div>
	);

	return (
		<div className="shadow-lg h-48 mx-auto max-w-4xl rounded-lg flex flex-row overflow-hidden">
			<div className="w-full flex flex-row">
				{ImageContainer}
				{InfoContainer}
			</div>
			{PaletteContainer}
		</div>
	);
};

export default PaletteCard;
