import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Assuming you're using react-copy-to-clipboard

const PaletteCard = ({ palette }) => {
	const [kValue, setKValue] = useState(0);
	const copyToClipboard = () => {
		// your implementation to copy palette.palette[kValue] to clipboard
	};

	return (
		<div className="my-4 flex flex-col md:flex-row shadow-lg mx-auto md:max-w-2xl bg-white rounded-lg">
			<div className="grid grid-cols-2 grid-rows-4 gap-0 w-full">
				<PaletteCardHeader />
				<PaletteCardImg palette={palette} />
				<PaletteCardColors palette={palette} kValue={kValue} />
				<PaletteCardCounter kValue={kValue} setKValue={setKValue} />
				<PaletteCardCopySection
					palette={palette}
					kValue={kValue}
					copyToClipboard={copyToClipboard}
				/>
			</div>
		</div>
	);
};

export default PaletteCard;

function PaletteCardCopySection(palette, kValue, copyToClipboard) {
	return (
		<div className="flex flex-row justify-center items-center">
			<CopyToClipboard text={palette.palette[kValue]}>
				<button
					onClick={copyToClipboard}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Copy to clipboard
				</button>
			</CopyToClipboard>
		</div>
	);
}

function PaletteCardCounter({ kValue, setKValue }) {
	return (
		<div className="flex flex-row items-center justify-center">
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
		</div>
	);
}

function PaletteCardColors({ palette, kValue }) {
	return (
		<div className="flex flex-row items-center justify-center">
			<div className="flex flex-row flex-wrap justify-center items-center">
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
		</div>
	);
}

function PaletteCardImg({ palette }) {
	return (
		<div className="row-start-2 row-span-4 col-start-1 col-span-1">
			<img
				className="w-full object-cover object-center shadow-md h-64"
				src={palette.imageUrl}
				alt="thumbnail"
			/>
		</div>
	);
}

function PaletteCardHeader() {
	return (
		<div className="col-span-2 row-span-1">
			<h1 className="text-primary h-full text-4xl font-bold p-4 text-center md:text-left">
				Image Title
			</h1>
		</div>
	);
}
