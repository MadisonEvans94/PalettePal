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
			<div className="h-[200px] md:h-[300px] lg:h-[400px] flex flex-row items-center bg-[#0f0f0f] border rounded-lg overflow-hidden">
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
			<div className="bg-[#0f0f0f] h-[300px] flex flex-row items-center justify-center border lg:h-[400px] overflow-hidden rounded-lg">
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
			<ColorCountSelector
				clusterQty={clusterQty}
				setClusterQty={setClusterQty}
				pixelData={pixelData}
			/>
			<Palette clusterQty={clusterQty} />
			<div className="w-full flex flex-row justify-center items-center">
				<ClipboardCopyButton clusterQty={clusterQty} />
			</div>
		</PaletteViewLayout>
	);
};

export default PaletteView;
