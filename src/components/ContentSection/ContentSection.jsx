import React from "react";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import ColorCountSelector from "../ColorCountSelector/ColorCountSelector";
import Input from "../Input/Input.jsx";
import { useState } from "react";
import { processCentroids } from "../../helpers/clusterFunctions";

const ContentSection = ({ pixelData, setPixelData, setColorsNeedUpdate }) => {
	const [clusterQty, setClusterQty] = useState(3);

	const [rgb, centroid_rgb, centroidX, centroidY, centroidZ, xVal, yVal, zVal] =
		processCentroids(pixelData, clusterQty);

	return (
		<>
			<div className="w-screen h-screen flex flex-col items-center fixed overflow-y-auto overscroll-auto">
				<div className="flex-1 grid grid-cols-1">
					<Input
						setPixelDataForParent={setPixelData}
						setColorsNeedUpdate={setColorsNeedUpdate}
					/>

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
					<ColorCountSelector
						clusterQty={clusterQty}
						setClusterQty={setClusterQty}
						pixelData={pixelData}
					/>
					<Palette centroid_rgb={centroid_rgb} />
				</div>
			</div>
		</>
	);
};

export default ContentSection;
