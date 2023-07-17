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
import { CentroidContext } from "../../Contexts/CentroidContext";

const PaletteView = () => {
	const { imgFile, pixelData, setIsLoading } = useContext(AppContext);
	console.log(pixelData);
	const { clusterQty, setClusterQty, centroidVals, pixelVals } =
		useImageProcessing();

	const { tokens, userData } = useContext(AccountContext);
	const { centroidArray } = useContext(CentroidContext);
	async function savePalette(imageData, paletteData) {
		try {
			console.log("encoded image from client...");
			console.log(JSON.stringify({ image: imageData }));
			setIsLoading(true);
			const response = await fetch(
				"https://du65t1mu0a.execute-api.us-east-2.amazonaws.com/production/palette-pal-image-CRUD",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: tokens,
						userid: userData.username,
					},
					body: JSON.stringify({
						image: imageData,
						palette: paletteData,
					}),
				}
			);
			if (!response.ok) {
				setIsLoading(false);
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				setIsLoading(false);
				const jsonData = await response.json();
				return jsonData; // Returns the response data from the server.
			}
		} catch (err) {
			setIsLoading(false);
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
				onClick={() => savePalette(imgFile.src, centroidArray)}
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
		<div className="text-shade h-full flex flex-row items-center justify-center border lg:h-[400px] overflow-hidden rounded-lg w-full">
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
