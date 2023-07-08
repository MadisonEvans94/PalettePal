import React, { useState, useContext, useEffect } from "react";
import ClipboardCopyButton from "../../components/ClipboardCopyButton/ClipboardCopyButton";
import CustomPlot from "../../components/Plot/CustomPlot";
import Palette from "../../components/Palette/Palette.jsx";
import ColorCountSelector from "../../components/ColorCountSelector/ColorCountSelector";
import { hexArrayToRGBArray, processPixels } from "../../helpers/imageHelpers";
import { CentroidContext } from "../../Contexts/CentroidContext";
import AppContext from "../../Contexts/AppContext";

function DashboardLayout({ plot, image, counter, palette, clipboard }) {
	return (
		<div className="h-screen w-screen overflow-auto fixed overscroll-none">
			<div className="overscroll-y-none w-full h-full overflow-auto flex flex-col items-center justify-start md:justify-center bg-[#0f0f0f]">
				<div className="mx-auto max-w-7xl p-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="h-[200px] md:h-[300px] lg:h-[400px] flex flex-row items-center bg-[#0f0f0f] border rounded-lg overflow-hidden">
							{image}
						</div>
						<div className="bg-[#0f0f0f] h-[300px] flex flex-row items-center justify-center border lg:h-[400px] overflow-hidden rounded-lg">
							{plot}
						</div>
					</div>
				</div>
				{counter}
				{palette}
				<div className="w-full flex flex-row justify-center items-center">
					{clipboard}
				</div>
			</div>
		</div>
	);
}

function InputImage({ src }) {
	return (
		<div className="w-full md:flex md:justify-center ">
			<img
				src={src}
				alt="input_image"
				class="inset-0 object-cover object-center"
			/>
		</div>
	);
}

const PaletteView = () => {
	const { pixelData, imgFile } = useContext(AppContext);
	const { centroidArray } = useContext(CentroidContext);
	const [clusterQty, setClusterQty] = useState(3);
	const [centroidXVals, setCentroidXVals] = useState(null);
	const [centroidYVals, setCentroidYVals] = useState(null);
	const [centroidZVals, setCentroidZVals] = useState(null);
	const [rgb, setRgb] = useState(null);
	const [xVal, setXVal] = useState(null);
	const [yVal, setYVal] = useState(null);
	const [zVal, setZVal] = useState(null);

	console.log("Pixel Data:", pixelData);
	console.log("Image File:", imgFile);
	console.log("Centroid Array:", centroidArray);

	useEffect(() => {
		if (pixelData && centroidArray) {
			const [processedRgb, processedXVal, processedYVal, processedZVal] =
				processPixels(pixelData);
			const centroidRGBVals = hexArrayToRGBArray(centroidArray[clusterQty - 1]);
			setRgb(processedRgb);
			setXVal(processedXVal);
			setYVal(processedYVal);
			setZVal(processedZVal);
			setCentroidXVals(centroidRGBVals[0]);
			setCentroidYVals(centroidRGBVals[1]);
			setCentroidZVals(centroidRGBVals[2]);
		}
	}, [centroidArray, clusterQty, pixelData]);

	return (
		<DashboardLayout
			plot={
				pixelData && centroidArray ? (
					<CustomPlot
						pixelData={pixelData}
						centroidX={centroidXVals}
						centroidY={centroidYVals}
						centroidZ={centroidZVals}
						rgb={rgb}
						xVal={xVal}
						yVal={yVal}
						zVal={zVal}
					/>
				) : (
					<div>No Plot Available</div>
				)
			}
			image={
				imgFile ? (
					<InputImage src={imgFile.src} />
				) : (
					<div>No Image Selected</div>
				)
			}
			counter={
				<ColorCountSelector
					clusterQty={clusterQty}
					setClusterQty={setClusterQty}
					pixelData={pixelData}
				/>
			}
			palette={<Palette clusterQty={clusterQty} />}
			clipboard={<ClipboardCopyButton clusterQty={clusterQty} />}
		/>
	);
};

export default PaletteView;
