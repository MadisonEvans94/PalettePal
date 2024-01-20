import React, { useState } from "react";
import { ClusterData } from "./App";
import Plot from "react-plotly.js";
import { PaletteColorWidgetProps } from "./PaletteColorWidget";

interface WidgetPaneProps {
	clusterData: ClusterData;
}

const WidgetPane: React.FC<WidgetPaneProps> = ({ clusterData }) => {
	const [colorCount, setColorCount] = useState<number>(2);
	console.log(clusterData);
	const incrementColorCount = () => {
		if (colorCount < clusterData.clusters.length - 1) {
			setColorCount(colorCount + 1);
		}
	};

	const decrementColorCount = () => {
		if (colorCount > 0) {
			setColorCount(colorCount - 1);
		}
	};

	return (
		<div className="bg-gray-800 text-white h-full flex items-center">
			<PaletteRatioWidget
				clusterData={clusterData}
				decrementColorCount={decrementColorCount}
				colorCount={colorCount}
				incrementColorCount={incrementColorCount}
			/>
		</div>
	);
};
const PaletteRatioWidget: React.FC<PaletteColorWidgetProps> = ({
	clusterData,
	colorCount,
	decrementColorCount,
	incrementColorCount,
}) => {
	return (
		<div className="h-full w-full flex flex-col">
			{" "}
			{/* Changed to flex-col for a vertical layout */}
			{/* Plot container */}
			<div className="flex-grow">
				{" "}
				{/* This allows the plot to fill the available space */}
				<Plot
					data={[
						{
							values: clusterData.ratio[colorCount],
							labels: clusterData.clusters[colorCount],
							type: "pie",
							marker: {
								colors: clusterData.clusters[colorCount],
							},
						},
					]}
					layout={{
						autosize: true,
						title: "My Responsive Plot",
						paper_bgcolor: "rgba(0,0,0,0)",
						plot_bgcolor: "rgba(0,0,0,0)",
					}}
					useResizeHandler={true}
					style={{ width: "100%", height: "100%" }} // Adjusted for full width and height
				/>
			</div>
			{/* Counter buttons container */}
			<div className="flex justify-center items-center p-2">
				{" "}
				{/* Added padding */}
				<button
					onClick={decrementColorCount}
					disabled={colorCount === 0}
					className={`px-3 py-1 border border-gray-400 rounded ${
						colorCount === 0 ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					-
				</button>
				<span className="text-lg px-4">{colorCount + 1}</span>{" "}
				{/* Added horizontal padding */}
				<button
					onClick={incrementColorCount}
					disabled={colorCount === clusterData.clusters.length - 1}
					className={`px-3 py-1 border border-gray-400 rounded ${
						colorCount === clusterData.clusters.length - 1
							? "opacity-50 cursor-not-allowed"
							: ""
					}`}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default WidgetPane;
