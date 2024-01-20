import React from "react";
import Plot from "react-plotly.js";
import { PaletteColorWidgetProps } from "./PaletteColorWidget";

const PaletteRatioWidget: React.FC<PaletteColorWidgetProps> = ({
	clusterData,
	colorCount,
	decrementColorCount,
	incrementColorCount,
}) => {
	return (
		<div className="flex-grow">
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
	);
};

export default PaletteRatioWidget;
