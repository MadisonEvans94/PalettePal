import React, { useContext } from "react";
import ClipboardCopyButton from "../../components/ClipboardCopyButton/ClipboardCopyButton";
import CustomPlot from "../../components/Plot/CustomPlot";
import Palette from "../../components/Palette/Palette.jsx";
import ColorCountSelector from "../../components/ColorCountSelector/ColorCountSelector";
import { useImageProcessing } from "../../hooks/useImageProcessing";
import PaletteViewLayout from "../../Layouts/PaletteViewLayout";
import AppContext from "../../Contexts/AppContext";
import InputButton from "../../components/Input/Input";
import { AccountContext } from "../../components/Account";

const PaletteView = () => {
	const { imgFile, pixelData } = useContext(AppContext);
	const { clusterQty, setClusterQty, centroidVals, pixelVals } =
		useImageProcessing();
	const { tokens, userData } = useContext(AccountContext);

	async function savePalette(paletteData) {
		console.log("saving palette...");
		try {
			const response = await fetch(
				"https://du65t1mu0a.execute-api.us-east-2.amazonaws.com/production/palette-pal-image-CRUD",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: tokens, // This is where your tokens go
						userid: userData.username, // Pass the userId in headers (assuming you have it in userData)
					},
					body: JSON.stringify(paletteData), // Convert your palette data to a JSON string
				}
			);

			// The response from the server is a promise. You need to handle this promise.
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const jsonData = await response.json();
				console.log(jsonData); // You can remove this line after testing.
				return jsonData; // Returns the response data from the server.
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<PaletteViewLayout>
			<ImageCanvas imgFile={imgFile} />
			<PlotCanvas
				pixelData={pixelData}
				pixelVals={pixelVals}
				centroidVals={centroidVals}
			/>
			<ColorCountSelector
				clusterQty={clusterQty}
				setClusterQty={setClusterQty}
				pixelData={pixelData}
			/>
			<Palette clusterQty={clusterQty} />
			<ClipboardCopyButton clusterQty={clusterQty} />

			<button
				onClick={() =>
					savePalette({
						palette: {
							L: [
								{ L: [{ S: "#486591" }] },
								{ L: [{ S: "#4d88c3" }, { S: "#443f24" }] },
								{ L: [{ S: "#4d88c3" }, { S: "#443f24" }, { S: "#443f24" }] },
								{
									L: [
										{ S: "#4d88c3" },
										{ S: "#443f24" },
										{ S: "#443f24" },
										{ S: "#443f24" },
									],
								},
								{
									L: [
										{ S: "#4d88c3" },
										{ S: "#443f24" },
										{ S: "#443f24" },
										{ S: "#443f24" },
										{ S: "#443f24" },
									],
								},
							],
						},
					})
				}
				className="w-48 p-3 my-3 transition border rounded border-primary text-info hover:text-primary bg-primary hover:bg-white"
			>
				Save Palette
			</button>
			<InputButton
				buttonText="Upload New Image"
				styleProp="cursor-pointer w-48 p-3 my-3 transition border rounded border-primary text-info hover:text-primary bg-primary hover:bg-white"
			/>
		</PaletteViewLayout>
	);
};

export default PaletteView;

function PlotCanvas({ pixelVals, centroidVals, pixelData }) {
	return (
		<div className="text-shade h-[300px] flex flex-row items-center justify-center border lg:h-[400px] overflow-hidden rounded-lg w-full">
			{pixelVals && centroidVals ? (
				<CustomPlot
					pixelData={pixelData}
					centroidX={centroidVals.xVals}
					centroidY={centroidVals.yVals}
					centroidZ={centroidVals.zVals}
					rgb={pixelVals.rgb}
					xVal={pixelVals.xVal}
					yVal={pixelVals.yVal}
					zVal={pixelVals.zVal}
				/>
			) : (
				<div className="flex flex-row items-center justify-center w-full h-full">
					<p className="h-fit">No Plot Available</p>
				</div>
			)}
		</div>
	);
}
// bg-[#0f0f0f]
function ImageCanvas({ imgFile }) {
	return (
		<div className="text-shade md:h-[300px] lg:h-[400px] w-full flex flex-row items-center border rounded-lg overflow-hidden">
			{imgFile ? (
				<img
					src={imgFile.src}
					alt="input_image"
					className="inset-0 object-cover object-center bg-transparent"
				/>
			) : (
				<div className="flex flex-row items-center justify-center w-full h-full bg-transparent">
					<p className="h-fit">No Image Selected</p>
				</div>
			)}
		</div>
	);
}
