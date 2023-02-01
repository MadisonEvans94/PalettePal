import React from "react";
import Plot from "react-plotly.js";

//[ ] pass x, y, and z values down as props
const CustomPlot = () => {
	return (
		<Plot
			data={[
				{
					x: [1, 2, 3, 4, 5],
					y: [2, 3, 4, 5, 6],
					z: [1, 2, 3, 4, 5],
					type: "scatter3d",
				},
			]}
			layout={{ width: 300, height: 300, title: "A Fancy Plot" }}
		/>
	);
};

export default CustomPlot;
