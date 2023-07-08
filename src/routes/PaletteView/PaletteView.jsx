import React, { useContext } from "react";
import ClipboardCopyButton from "../../components/ClipboardCopyButton/ClipboardCopyButton";
import CustomPlot from "../../components/Plot/CustomPlot";
import Palette from "../../components/Palette/Palette.jsx";
import ColorCountSelector from "../../components/ColorCountSelector/ColorCountSelector";
import { useImageProcessing } from "../../hooks/useImageProcessing";
import PaletteViewLayout from "../../Layouts/PaletteViewLayout";
import AppContext from "../../Contexts/AppContext";

const PaletteView = () => {
	const { imgFile, pixelData } = useContext(AppContext);
	const { clusterQty, setClusterQty, centroidVals, pixelVals } =
		useImageProcessing();

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
		</PaletteViewLayout>
	);
};

export default PaletteView;

function PlotCanvas({ pixelVals, centroidVals, pixelData }) {
	return (
		<div className="bg-[#0f0f0f] h-[300px] flex flex-row items-center justify-center border lg:h-[400px] overflow-hidden rounded-lg w-full">
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
				<div>No Plot Available</div>
			)}
		</div>
	);
}

function ImageCanvas({ imgFile }) {
	return (
		<div className="h-[200px] md:h-[300px] lg:h-[400px] w-full flex flex-row items-center bg-[#0f0f0f] border rounded-lg overflow-hidden">
			{imgFile ? (
				<img
					src={imgFile.src}
					alt="input_image"
					class="inset-0 object-cover object-center"
				/>
			) : (
				<div>No Image Selected</div>
			)}
		</div>
	);
}
