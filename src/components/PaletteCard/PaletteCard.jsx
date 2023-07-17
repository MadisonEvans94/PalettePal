import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Assuming you're using react-copy-to-clipboard

const PaletteCard = ({ palette }) => {
	const [kValue, setKValue] = useState(0);

	const copyToClipboard = () => {
		// your implementation to copy palette.palette[kValue] to clipboard
	};

	return (
		<div className="my-4 flex flex-col md:flex-row shadow-lg mx-auto max-w-lg md:max-w-2xl bg-white rounded-lg">
			<h1 className="text-2xl font-bold p-4 text-center md:text-left">TITLE</h1>
			<div className="flex items-center justify-center w-full px-6 py-8 md:w-1/2">
				<img
					className="w-full object-cover object-center rounded-lg shadow-md h-64"
					src={palette.imageUrl}
					alt="thumbnail"
				/>
			</div>
			<div className="w-full md:w-1/2 px-4 py-8">
				<div className="flex items-center justify-center">
					<button
						onClick={() => {
							if (kValue > 0) setKValue(kValue - 1);
						}}
						className="px-3 py-2 rounded-l-lg bg-gray-200 text-gray-700 font-semibold focus:outline-none"
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
						className="px-3 py-2 rounded-r-lg bg-gray-200 text-gray-700 font-semibold focus:outline-none"
					>
						+
					</button>
				</div>
				<div className="flex flex-row flex-wrap mt-4 justify-center items-center">
					{palette.palette[kValue].map((color, id) => {
						return (
							<div
								key={id}
								className="w-6 h-6 rounded-full mx-1 mt-2"
								style={{ backgroundColor: color }}
							/>
						);
					})}
				</div>
				<CopyToClipboard text={palette.palette[kValue]}>
					<button
						onClick={copyToClipboard}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
					>
						Copy to clipboard
					</button>
				</CopyToClipboard>
			</div>
		</div>
	);
};

export default PaletteCard;
