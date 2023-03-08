import React from "react";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import ColorCountSelector from "../ColorCountSelector/ColorCountSelector";
import Input from "../Input/Input.jsx";
import { useState } from "react";
import { processCentroids } from "../../helpers/clusterFunctions";
import testImg from "../../prototyping/bird.jpg";

const ContentSection = ({ pixelData, setPixelData, setColorsNeedUpdate }) => {
	const [clusterQty, setClusterQty] = useState(3);
	console.log(pixelData);
	const [rgb, centroid_rgb, centroidX, centroidY, centroidZ, xVal, yVal, zVal] =
		processCentroids(pixelData, clusterQty);

	return (
		<>
			<div className="w-screen h-screen flex flex-col items-center fixed overflow-y-auto overscroll-auto">
				<div className="flex-1 grid grid-cols-1 ">
					<Input
						setPixelDataForParent={setPixelData}
						setColorsNeedUpdate={setColorsNeedUpdate}
					/>
					<div className="flex flex-row justify-between w-screen max-h-96">
						<CustomPlot
							pixelData={pixelData}
							rgb={rgb}
							centroid_rgb={centroid_rgb}
							centroidX={centroidX}
							centroidY={centroidY}
							centroidZ={centroidZ}
							xVal={xVal}
							yVal={yVal}
							zVal={zVal}
						/>
						<div className="w-full hidden md:block border">
							<img
								src={testImg}
								alt="testing"
								class="inset-0 w-full h-full object-cover object-center "
							/>
						</div>
					</div>
					<ColorCountSelector
						clusterQty={clusterQty}
						setClusterQty={setClusterQty}
						pixelData={pixelData}
					/>
					<Palette centroid_rgb={centroid_rgb} />
					<div className="w-full flex flex-row justify-center items-center">
						<button className="p-3 my-3 border rounded border-white">
							copy to clipboard
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContentSection;
