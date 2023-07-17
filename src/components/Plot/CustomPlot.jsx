import React from "react";
import Plot from "react-plotly.js";

const CustomPlot = ({
	rgb,
	centroidX,
	centroidY,
	centroidZ,
	xVal,
	yVal,
	zVal,
}) => {
	// Define scatter trace for centroids
	const trace1 = {
		type: "scatter3d",
		mode: "markers",
		name: "centroid",
		x: centroidX,
		y: centroidY,
		z: centroidZ,
		marker: {
			size: 12,
			color: "#000",
		},
		hovertemplate:
			"R: %{x:.2f} G: %{y:.2f} B: %{z:.2f}<extra>Centroid Value</extra> ",
	};

	// Define scatter trace for pixels
	const trace2 = {
		type: "scatter3d",
		mode: "markers",
		name: "pixel",
		x: xVal,
		y: yVal,
		z: zVal,
		marker: {
			size: 3,
			color: rgb,
			opacity: 0.9,
		},
		hovertemplate:
			"R: %{x:.2f} G: %{y:.2f} B: %{z:.2f}<extra>Pixel Value</extra> ",
	};

	return (
		<div
			className="relative flex flex-row p-auto w-full h-full"
			style={{ width: "100%", height: "100%" }}
		>
			<Plot
				data={[trace1, trace2]}
				layout={{
					autosize: true,
					width: "100%",
					height: "100%",
					margin: {
						l: 0,
						r: 100,
						b: 0,
						t: 0,
						pad: 0,
					},
					paper_bgcolor: "#FFF",
					legend: {
						x: 1,
						y: -0.1,
						xanchor: "right",
						yanchor: "bottom",
					},
					scene: {
						camera: {
							eye: { x: 1.5, y: 1.5, z: 1.5 }, // Adjust these values to control the initial zoom
						},
					},
				}}
				useResizeHandler
			/>
		</div>
	);
};

export default CustomPlot;
