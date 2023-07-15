import React from "react";
import { useState } from "react";

const PaletteCard = ({ palettes }) => {
	const [kValue, setKValue] = useState(0);
	console.log(palettes[0], "PPPP");
	return (
		<div className="flex flex-col md:flex-row shadow-lg mx-auto max-w-lg md:max-w-2xl bg-white rounded-lg">
			<div className="flex items-center justify-center w-full px-6 py-8 md:w-1/2">
				<img
					className="w-full object-cover object-center rounded-lg shadow-md h-64"
					src={palettes[0].imageUrl}
					alt="thumbnail"
				/>
			</div>
			<div className="w-full md:w-1/2 px-4 py-8">
				<div className="flex items-center justify-center">
					<button
						onClick={() => {
							if (kValue > 0) setKValue(kValue - 1);
						}}
						className="px-3 py-2 rounded-l-lg bg-gray-200 text-gray-700 font-semibold"
					>
						-
					</button>
					<span className="px-3 py-2 bg-gray-200 text-gray-700 font-semibold">
						{kValue + 1}
					</span>
					<button
						onClick={() => {
							if (kValue < 4) setKValue(kValue + 1);
						}}
						className="px-3 py-2 rounded-r-lg bg-gray-200 text-gray-700 font-semibold"
					>
						+
					</button>
				</div>
				<div className="flex flex-row flex-wrap mt-4 justify-center items-center">
					{palettes[0].palette[kValue].map((color) => {
						return (
							<div
								className="w-6 h-6 rounded-full mx-1 mt-2"
								style={{ backgroundColor: color }}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PaletteCard;
