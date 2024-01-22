import React from "react";
import Plot from "react-plotly.js";
import { PaletteColorWidgetProps } from "./PaletteColorWidget";

const PaletteRatioWidget: React.FC<PaletteColorWidgetProps> = ({
	clusterData,
	colorCount,
}) => {
	return (
		<div className="flex-grow w-full h-full">
			<Plot
				data={[
					{
						values: clusterData.ratio[colorCount],
						labels: clusterData.clusters[colorCount],
						type: "pie",
						marker: {
							colors: clusterData.clusters[colorCount],
						},
						textinfo: "percent",
					},
				]}
				layout={{
					autosize: true,

					// paper_bgcolor: "rgba(0,0,0,0)",
					plot_bgcolor: "rgba(0,0,0,0)",
					font: {
						size: 16,
						color: "rgb(115 115 115)",
					},
				}}
				useResizeHandler={true}
				style={{ width: "100%", height: "100%" }}
			/>
		</div>
	);
};

export default PaletteRatioWidget;
