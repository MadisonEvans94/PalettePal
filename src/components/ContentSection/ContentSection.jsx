import React from "react";
import "./ContentSection.css";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import Input from "../Input/Input.jsx";
import { useState, useEffect } from "react";
import { processCentroids } from "../../helpers/clusterFunctions";

const ContentSection = () => {
	const [pixelData, setPixelData] = useState([]);
	const [centroidRGB, setCentroidRGB] = useState(null);
	const [colorsNeedUpdate, setColorsNeedUpdate] = useState(false);
	const clusterQty = 4;
	if (colorsNeedUpdate) {
		console.log("test");

		setColorsNeedUpdate(false);
	}
	const [rgb, centroid_rgb, centroidX, centroidY, centroidZ, xVal, yVal, zVal] =
		processCentroids(pixelData, clusterQty);

	console.log("centroid_rgb: ", centroid_rgb);
	console.log("centroidRGB: ", centroidRGB);

	return (
		<>
			<div className="content-section-container">
				<Input
					setPixelDataForParent={setPixelData}
					setColorsNeedUpdate={setColorsNeedUpdate}
				/>

				<div className="plot-container">
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
					<Palette centroid_rgb={centroid_rgb} />
				</div>
			</div>
		</>
	);
};

export default ContentSection;
