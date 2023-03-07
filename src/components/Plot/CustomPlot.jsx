import React from "react";
import Plot from "react-plotly.js";

const CustomPlot = ({
	pixelData,
	rgb,
	centroid_rgb,
	centroidX,
	centroidY,
	centroidZ,
	xVal,
	yVal,
	zVal,
}) => {
	if (pixelData.length === 0) {
		return <></>;
	}

	const trace1 = {
		type: "scatter3d",
		mode: "markers",
		name: "centroids",
		x: centroidX,
		y: centroidY,
		z: centroidZ,
		marker: {
			size: 20,
			color: centroid_rgb,
			line: {
				width: 10,
				color: "white",
			},
		},
	};
	const trace2 = {
		type: "scatter3d",
		mode: "markers",
		name: "pixels",
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
		<div className="w-screen bg-pink-500 flex flex-row items-center justify-center p-auto">
			<Plot
				data={[trace1, trace2]}
				layout={{
					responsive: true,
					autosize: false,
					width: "100vw",
					height: 400,
					margin: {
						l: 0,
						r: 0,
						b: 0,
						t: 0,
						pad: 0,
					},
					paper_bgcolor: "#FFD",
					legend: {
						x: 1,
						y: 0,
						xanchor: "right",
						yanchor: "bottom",
					},
				}}
			/>
		</div>
	);
};

export default CustomPlot;
