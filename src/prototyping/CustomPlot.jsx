import React from "react";
import Plot from "react-plotly.js";

//[ ] pass x, y, and z values down as props

function transpose(matrix) {
	const transposedMatrix = [];
	const rows = matrix.length;
	const cols = matrix[0].length;

	for (let i = 0; i < cols; i++) {
		transposedMatrix[i] = [];
		for (let j = 0; j < rows; j++) {
			transposedMatrix[i][j] = matrix[j][i];
		}
	}

	return transposedMatrix;
}

//makePoints is only here as a helper for testing
function makePoints() {
	let array = [];
	for (let i = 0; i < 1000; i++) {
		array.push(Math.floor(Math.random() * 255));
	}
	return array;
}
const xVal = makePoints();
const yVal = makePoints();
const zVal = makePoints();
const rgb = [xVal, yVal, zVal];
const rgbTranspose = transpose(rgb);
const rgbFinal = [];
rgbTranspose.forEach((point) => {
	rgbFinal.push(`rgb(${point[0]}, ${point[1]}, ${point[2]})`);
});

//TODO: make this the main implementation once we're done testing
// function fillXYZ(pixelArray) {
// 	pixelArray.forEach((pixel) => {
// 		xVal.push(pixel[0]);
// 		yVal.push(pixel[1]);
// 		zVal.push(pixel[2]);
// 	});
// }

const CustomPlot = () => {
	return (
		<Plot
			data={[
				{
					type: "scatter3d",
					mode: "markers",
					x: xVal,
					y: yVal,
					z: zVal,
					marker: {
						size: 2,
						color: rgbFinal,
					},
				},
			]}
			layout={{
				autosize: false,
				width: 300,
				height: 300,
				margin: {
					l: 0,
					r: 0,
					b: 0,
					t: 0,
					pad: 0,
				},
				paper_bgcolor: "#000",
			}}
			// config={{ responsive: true }}
		/>
	);
};

export default CustomPlot;
