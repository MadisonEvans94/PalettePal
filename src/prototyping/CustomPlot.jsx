import React from "react";
import Plot from "react-plotly.js";

/**
 * Transposes a given matrix
 *
 * @param {Array<Array<number>>} matrix - 2D array to be transposed
 * @returns {Array<Array<number>>} - Transposed matrix
 */
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

/**
 * Converts pixel data into arrays for x, y, and z values
 *
 * @param {Array<Array<number>>} pixelArray - Array of pixel data
 * @returns {Array<Array<number>>} - Array of arrays containing x, y, and z values
 */
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

/**
 * Converts RGB data into CSS-style color strings
 *
 * @param {Array<Array<number>>} rgb - Array of RGB values
 * @returns {Array<string>} - Array of CSS-style color strings
 */
const formatRGB = (rgb) => {
	const transposed = transpose(rgb);
	return transposed.map(
		(point) => `rgb(${point[0]}, ${point[1]}, ${point[2]})`
	);
};

/**
 * Down-samples an array by keeping every nth value
 *
 * @param {Array<any>} arr - Array to be down-sampled
 * @param {number} factor - Factor by which to down-sample the array (i.e., keep every nth value)
 * @returns {Array<any>} - Down-sampled array
 */
function downSample(arr, factor) {
	const newArray = [];
	for (let i = 0; i < arr.length; i++) {
		if (i % factor === 0) {
			newArray.push(arr[i]);
		}
	}
	return newArray;
}

/**
 * Component that displays a 3D scatter plot
 *
 * @param {Object} props - Component props
 * @param {Array<Array<number>>} props.pixelData - Array of pixel data
 * @returns {React.Component} - 3D scatter plot
 */
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
