import React from "react";
import Plot from "react-plotly.js";
import {
	kMeans,
	fillXYZ,
	formatRGB,
	downSample,
} from "../../helpers/clusterFunctions";

/**
 * Component that displays a 3D scatter plot
 *
 * @param {Object} props - Component props
 * @param {Array<Array<number>>} props.pixelData - Array of pixel data
 * @returns {React.Component} - 3D scatter plot
 */

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
	const pixelDataShrink = downSample(pixelData, 15);

	const centroids = kMeans(pixelDataShrink, clusterQty);

	const [xVal, yVal, zVal] = fillXYZ(pixelDataShrink);
	const [centroidX, centroidY, centroidZ] = fillXYZ(centroids);
	const rgb = formatRGB([xVal, yVal, zVal]);
	const centroidRGB = formatRGB([centroidX, centroidY, centroidZ]);
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
	console.log(
		"custom plot component rendering",
		"centroid RGB = ",
		centroidRGB
	);

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
