import React from "react";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

interface CustomPlotProps {
	rgb: string[]; // Assuming rgb is an array of color strings like ['#ffffff', '#000000']
	centroidX: number[];
	centroidY: number[];
	centroidZ: number[];
	xVal: number[];
	yVal: number[];
	zVal: number[];
}

const CustomPlot: React.FC<CustomPlotProps> = ({
	rgb,
	centroidX,
	centroidY,
	centroidZ,
	xVal,
	yVal,
	zVal,
}) => {
	// Define scatter trace for centroids
	const trace1: Partial<Plotly.ScatterData> = {
		type: "scatter3d",
		mode: "markers",
		name: "centroid",
		x: centroidX,
		y: centroidY,
		z: centroidZ,
		marker: {
			size: 12,
			color: "#FFF",
		},
		hovertemplate:
			"R: %{x:.2f} G: %{y:.2f} B: %{z:.2f}<extra>Centroid Value</extra>",
	};

	// Define scatter trace for pixels
	const trace2: Partial<Plotly.ScatterData> = {
		type: "scatter3d",
		mode: "markers",
		name: "pixel",
		x: xVal,
		y: yVal,
		z: zVal,
		marker: {
			size: 3,
			color: rgb, // Assuming this is an array of colors for each point
			opacity: 0.9,
		},
		hovertemplate:
			"R: %{x:.2f} G: %{y:.2f} B: %{z:.2f}<extra>Pixel Value</extra>",
	};

	return (
		<div className="relative flex flex-row p-auto w-full h-full">
			<Plot
				data={[trace1, trace2]}
				layout={{
					autosize: true,
					margin: {
						l: 0,
						r: 0,
						b: 0,
						t: 0,
						pad: 4,
					},
					paper_bgcolor: "#111111",
					plot_bgcolor: "#111111",
					legend: {
						x: 1,
						y: 1,
						xanchor: "right",
						yanchor: "top",
					},
					scene: {
						xaxis: { title: "R" },
						yaxis: { title: "G" },
						zaxis: { title: "B" },
						camera: {
							eye: { x: 1.5, y: 1.5, z: 1.5 },
						},
					},
				}}
				style={{ width: "100%", height: "100%" }}
				useResizeHandler={true}
			/>
		</div>
	);
};

export default CustomPlot;
