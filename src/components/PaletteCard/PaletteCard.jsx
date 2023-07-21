import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Assuming you're using react-copy-to-clipboard
import { AiOutlineCloseCircle as Delete } from "react-icons/ai";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiOutlineMinus as Minus } from "react-icons/ai";
const PaletteCard = ({ palette, userData, tokens, onDelete }) => {
	const [kValue, setKValue] = useState(0);

	const deletePalette = async () => {
		const deleteUrl = `https://du65t1mu0a.execute-api.us-east-2.amazonaws.com/production/palette-pal-image-CRUD/${palette.imageId}`;

		console.log("deleteurl", deleteUrl);
		console.log("tokens", tokens);
		console.log("userid", userData.username);
		try {
			const response = await fetch(deleteUrl, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: tokens,
					userid: userData.username,
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				console.log("Delete succeeded");
				if (onDelete) {
					onDelete(palette.imageId); // call the callback
				}
			}
		} catch (err) {
			console.error("Failed to delete item", err);
		}
	};

	return (
		<div className="border w-full relative my-16 grid grid-cols-2 grid-rows-4 gap-0 md:flex-row mx-auto md:max-w-2xl bg-white rounded-lg">
			<button
				className="absolute cursor-pointer text-primary z-50 right-2 top-2 hover:text-secondary transition"
				onClick={deletePalette}
			>
				<Delete size="1.5em" />
			</button>

			<PaletteCardImg palette={palette} />
			<PaletteCardColors palette={palette} kValue={kValue} />
			<PaletteCardCounter kValue={kValue} setKValue={setKValue} />
			<PaletteCardCopySection palette={palette} kValue={kValue} />
		</div>
	);
};

export default PaletteCard;

function PaletteCardCopySection({ palette, kValue }) {
	return (
		<div className="flex flex-row justify-center items-center">
			<CopyToClipboard text={palette.palette[kValue]}>
				<button className="text-info bg-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-secondary transition">
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
					className="px-3 py-2 rounded-l-lg text-primary font-semibold focus:outline-none hover:text-secondary transition"
				>
					<Minus />
				</button>
				<span className="px-3 text-xl py-2 text-primary font-semibold">
					{kValue + 1}
				</span>
				<button
					onClick={() => {
						if (kValue < 4) setKValue(kValue + 1);
					}}
					className="px-3 py-2 rounded-r-lg text-primary font-semibold focus:outline-none hover:text-secondary transition"
				>
					<Plus />
				</button>
			</div>
		</div>
	);
}

function PaletteCardColors({ palette, kValue }) {
	return (
		<div className="row-start-1 row-span-2 flex flex-row items-center justify-center">
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
		<div className="row-start-1 row-span-4 col-start-1 col-span-1">
			<img
				className="w-full object-cover object-center h-64"
				src={palette.imageUrl}
				alt="thumbnail"
			/>
		</div>
	);
}

// function PaletteCardHeader() {
// 	return (
// 		<div className="col-span-2 row-span-1">
// 			<h1 className="text-primary h-full text-4xl font-bold p-4 text-center">
// 				{/* add title here */}
// 			</h1>
// 		</div>
// 	);
// }
