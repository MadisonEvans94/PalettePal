import React from "react";
import Plot from "react-plotly.js";

const transpose = (matrix) => {
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
};

const fillXYZ = (pixelArray) => {
	const xVal = [];
	const yVal = [];
	const zVal = [];

	pixelArray.forEach((pixel) => {
		xVal.push(pixel[0]);
		yVal.push(pixel[1]);
		zVal.push(pixel[2]);
	});

	return [xVal, yVal, zVal];
};

const formatRGB = (rgb) => {
	const transposed = transpose(rgb);
	return transposed.map(
		(point) => `rgb(${point[0]}, ${point[1]}, ${point[2]})`
	);
};
function downSample(arr, factor) {
	const newArray = [];
	for (let i = 0; i < arr.length; i++) {
		if (i % factor === 0) {
			newArray.push(arr[i]);
		}
	}
	return newArray;
}

const CustomPlot = ({ pixelData }) => {
	const [xVal, yVal, zVal] = fillXYZ(downSample(pixelData, 15));
	const rgb = formatRGB([xVal, yVal, zVal]);

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
							color: rgb,
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
			/>
		</>
	);
};

export default CustomPlot;
