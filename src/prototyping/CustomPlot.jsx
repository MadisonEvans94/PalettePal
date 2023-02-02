import React from "react";
import Plot from "react-plotly.js";
import { useState } from "react";

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
// function makePoints() {
// 	let array = [];
// 	for (let i = 0; i < 1000; i++) {
// 		array.push(Math.floor(Math.random() * 255));
// 	}
// 	return array;
// }
const xVal = [];
const yVal = [];
const zVal = [];

//TODO: make this the main implementation once we're done testing
function fillXYZ(pixelArray) {
	pixelArray.forEach((pixel) => {
		xVal.push(pixel[0]);
		yVal.push(pixel[1]);
		zVal.push(pixel[2]);
	});
}

const CustomPlot = ({ pixelData }) => {
	// const [xValue, setXValue] = useState(null);
	// const [yValue, setYValue] = useState(null);
	// const [zValue, setZValue] = useState(null);
	// setXValue(xVal);
	// setYValue(yVal);
	// setZValue(zVal);

	fillXYZ(pixelData);
	const rgb = [xVal, yVal, zVal];
	const rgbTranspose = transpose(rgb);
	const rgbFinal = [];
	rgbTranspose.forEach((point) => {
		rgbFinal.push(`rgb(${point[0]}, ${point[1]}, ${point[2]})`);
	});

	return (
		<>
			<Plot
				data={[
					{
						type: "scatter3d",
						mode: "markers",
						x: xVal,
						y: yVal,
						z: zVal,
						marker: {
							size: 3,
							color: rgbFinal,
						},
					},
				]}
				layout={{
					autosize: false,
					width: 400,
					height: 400,
					margin: {
						l: 0,
						r: 0,
						b: 0,
						t: 0,
						pad: 0,
					},
					paper_bgcolor: "#FFF",
				}}
				// config={{ responsive: true }}
			/>
		</>
	);
};

export default CustomPlot;
