import React from "react";
import ClipboardCopyButton from "../ClipboardCopyButton/ClipboardCopyButton";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import ColorCountSelector from "../ColorCountSelector/ColorCountSelector";
import Input from "../Input/Input.tsx";
import { useState, useContext, useEffect } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { processPixels } from "../../helpers/pixelFunctions";
import hexArrayToRGBArray from "../../helpers/hexArrayToRGBArray";

function DashboardLayout({ plot, image, counter, palette, input, clipboard }) {
	return (
		<div className="h-screen w-screen overflow-auto fixed overscroll-none">
			<div className="overscroll-y-none w-full h-full overflow-auto flex flex-col items-center justify-start md:justify-center bg-[#0f0f0f]">
				<div className="m-6">{input}</div>
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

const ContentSection = ({
	isLoading,
	setIsLoading,
	pixelData,
	setPixelData,
	imgFile,
	setImgFile,
}) => {
	const { centroidArray } = useContext(CentroidContext);
	const [clusterQty, setClusterQty] = useState(3);
	const [rgb, xVal, yVal, zVal] = processPixels(pixelData);
	const [centroidXVals, setCentroidXVals] = useState(null);
	const [centroidYVals, setCentroidYVals] = useState(null);
	const [centroidZVals, setCentroidZVals] = useState(null);

	useEffect(() => {
		const centroidRGBVals = hexArrayToRGBArray(
			centroidArray.colors[clusterQty - 1]
		);
		setCentroidXVals(centroidRGBVals[0]);
		setCentroidYVals(centroidRGBVals[1]);
		setCentroidZVals(centroidRGBVals[2]);
	}, [centroidArray, clusterQty]);

	return (
		<>
			{" "}
			<DashboardLayout
				plot={
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
				}
				input={
					<Input
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						setPixelDataForParent={setPixelData}
						setImgFile={setImgFile}
					/>
				}
				image={<InputImage src={imgFile.src} />}
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
		</>
	);
};

export default ContentSection;
