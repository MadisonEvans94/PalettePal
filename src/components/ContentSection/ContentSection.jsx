import React from "react";
import ClipboardCopyButton from "../ClipboardCopyButton/ClipboardCopyButton";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import ColorCountSelector from "../ColorCountSelector/ColorCountSelector";
import Input from "../Input/Input.jsx";
import { useState, useContext, useEffect } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { processPixels } from "../../helpers/pixelFunctions";
import hexArrayToRGBArray from "../../helpers/hexArrayToRGBArray";
const ContentSection = ({ pixelData, setPixelData, imgFile, setImgFile }) => {
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
	console.log(centroidArray, "CENTROID ARRAY");

	return (
		<>
			<div className="w-screen h-screen flex flex-col items-center fixed overflow-y-auto overscroll-none p-8">
				<div className="flex-1 grid grid-cols-1 ">
					<Input setPixelDataForParent={setPixelData} setImgFile={setImgFile} />
					<div className="flex flex-row justify-between w-screen max-h-96 px-10">
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
						<div className="w-full hidden md:flex md:justify-center ">
							<img
								src={imgFile.src}
								alt="testing"
								class="inset-0 h-full object-cover object-center "
							/>
						</div>
					</div>
					<ColorCountSelector
						clusterQty={clusterQty}
						setClusterQty={setClusterQty}
						pixelData={pixelData}
					/>
					<Palette />
					<div className="w-full flex flex-row justify-center items-center">
						<ClipboardCopyButton clusterQty={clusterQty} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ContentSection;
