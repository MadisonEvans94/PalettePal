import React from "react";
import "./ContentSection.css";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import ColorCountSelector from "../ColorCountSelector/ColorCountSelector";
import Input from "../Input/Input.jsx";
import { useState } from "react";
import { processCentroids } from "../../helpers/clusterFunctions";

const ContentSection = ({ pixelData, setPixelData }) => {
	const [colorsNeedUpdate, setColorsNeedUpdate] = useState(false);
	const [clusterQty, setClusterQty] = useState(3);

	const [rgb, centroid_rgb, centroidX, centroidY, centroidZ, xVal, yVal, zVal] =
		processCentroids(pixelData, clusterQty);

	return (
		<>
			<div className="content-area">
				<Input
					className="input-area"
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
				<Palette centroid_rgb={centroid_rgb} className="palette-area" />
			</div>
		</>
	);
};

export default ContentSection;
