import React from "react";
import Plot from "react-plotly.js";
import { processCentroids } from "../../helpers/clusterFunctions";

const CustomPlot = ({
	pixelData,
	setCentroidRGB,
	setColorsNeedUpdate,
	colorsNeedUpdate,
	clusterQty,
}) => {
	if (pixelData.length === 0) {
		return <></>;
	}
	const [rgb, centroidRGB, centroidX, centroidY, centroidZ, xVal, yVal, zVal] =
		processCentroids(pixelData, clusterQty);
	if (colorsNeedUpdate) {
		setCentroidRGB(centroidRGB);
		setColorsNeedUpdate(false);
	}
	const trace1 = {
		type: "scatter3d",
		mode: "markers",
		x: centroidX,
		y: centroidY,
		z: centroidZ,
		marker: {
			size: 20,
			color: centroidRGB,
			line: {
				width: 10,
				color: "white",
			},
		},
	};
	const trace2 = {
		type: "scatter3d",
		mode: "markers",
		x: xVal,
		y: yVal,
		z: zVal,
		marker: {
			size: 3,
			color: rgb,
			opacity: 0.9,
		},
	};

	return (
		<>
			<Plot
				data={[trace1, trace2]}
				layout={{
					autosize: false,
					width: "100%",
					height: "100%",
					margin: {
						l: 0,
						r: 0,
						b: 0,
						t: 0,
						pad: 0,
					},
					paper_bgcolor: "#FFF",
				}}
			/>
		</>
	);
};

export default CustomPlot;
