import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function useWindowDimensions() {
	// Set initial dimensions of the window
	const [windowDimensions, setWindowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	// Listen for changes to the window size
	useEffect(() => {
		function handleResize() {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// Add resize event listener on mount
		window.addEventListener("resize", handleResize);

		// Remove resize event listener on unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

const CustomPlot = ({ rgb, xVal, yVal, zVal }) => {
	const { width, height } = useWindowDimensions();

	// Define scatter trace for centroids
	const trace1 = {
		type: "scatter3d",
		mode: "markers",
		name: "centroid",
		x: 0,
		y: 0,
		z: 0,
		marker: {
			size: 20,
			color: "#FFF",
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

	const plotHeight = width > 768 ? 380 : height * 0.35;

	return (
		<div className="flex flex-row p-auto w-full" style={{ width: "100%" }}>
			<Plot
				data={[trace1, trace2]}
				layout={{
					responsive: true,
					autosize: true,
					// Set width to half of window width if larger than 768px
					width: width > 768 ? width * 0.5 : width * 0.8,
					height: plotHeight,
					margin: {
						l: 0,
						r: 20,
						b: 0,
						t: 0,
						pad: 0,
					},
					paper_bgcolor: "#111111",
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
