import React from "react";
import Plot from "react-plotly.js";

const PaletteRatioWidget: React.FC = () => {
	return (
		<Plot
			data={[
				{
					values: [19, 26, 55],
					labels: ["Residential", "Non-Residential", "Utility"],
					type: "pie",
				},
			]}
			layout={{ autosize: true, title: "My Responsive Plot" }}
			useResizeHandler={true}
			style={{ height: "100%", width: "100%" }}
		/>
	);
};

export default PaletteRatioWidget;
