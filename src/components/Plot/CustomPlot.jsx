import React from "react";
import Plot from "react-plotly.js";

/**
 * Compute the Euclidean distance between two points
 * @param {Array} point1 - The first point in the form of [R, G, B]
 * @param {Array} point2 - The second point in the form of [R, G, B]
 * @returns {number} The Euclidean distance between the two points
 */
const euclideanDistance = (point1, point2) => {
	let distance = 0;
	for (let i = 0; i < point1.length; i++) {
		distance += (point1[i] - point2[i]) ** 2;
	}
	return Math.sqrt(distance);
};

/**
 * Find the closest centroid to a given point
 * @param {Array} point - The point in the form of [R, G, B]
 * @param {Array} centroids - An array of centroids in the form of [[R, G, B], [R, G, B], ...]
 * @returns {number} The index of the closest centroid in the centroids array
 */
const findClosestCentroid = (point, centroids) => {
	let minDistance = Infinity;
	let closestCentroidIndex = 0;
	for (let i = 0; i < centroids.length; i++) {
		let distance = euclideanDistance(point, centroids[i]);
		if (distance < minDistance) {
			minDistance = distance;
			closestCentroidIndex = i;
		}
	}
	return closestCentroidIndex;
};

/**
 * Compute the new centroids based on the closest centroids of each point
 * @param {Array} points - An array of points in the form of [[R, G, B], [R, G, B], ...]
 * @param {Array} closestCentroids - An array of the indices of the closest centroids for each point
 * @param {number} K - The number of centroids
 * @returns {Array} An array of the new centroids in the form of [[R, G, B], [R, G, B], ...]
 */
const computeCentroids = (points, closestCentroids, K) => {
	let centroids = Array(K)
		.fill(0)
		.map(() => Array(3).fill(0));
	let count = Array(K).fill(0);
	for (let i = 0; i < points.length; i++) {
		let centroidIndex = closestCentroids[i];
		count[centroidIndex]++;
		for (let j = 0; j < 3; j++) {
			centroids[centroidIndex][j] += points[i][j];
		}
	}
	for (let i = 0; i < K; i++) {
		for (let j = 0; j < 3; j++) {
			centroids[i][j] /= count[i];
		}
	}
	return centroids;
};

/**
 * Implements the KMeans clustering algorithm for RGB points, with a fixed number of iterations as the convergence criteria.
 *
 */
const kMeans = (points, K) => {
	let centroids = Array(K)
		.fill(0)
		.map(() => Array(3).fill(0));
	let closestCentroids = Array(points.length).fill(0);

	for (let i = 0; i < K; i++) {
		for (let j = 0; j < 3; j++) {
			centroids[i][j] = points[i][j];
		}
	}

	let change = true;
	while (change) {
		change = false;

		for (let i = 0; i < points.length; i++) {
			let closestCentroidIndex = findClosestCentroid(points[i], centroids);
			if (closestCentroidIndex !== closestCentroids[i]) {
				closestCentroids[i] = closestCentroidIndex;
				change = true;
			}
		}

		let newCentroids = computeCentroids(points, closestCentroids, K);

		for (let i = 0; i < newCentroids.length; i++) {
			let count = 0;
			for (let j = 0; j < 3; j++) {
				if (isNaN(newCentroids[i][j])) {
					newCentroids[i][j] = centroids[i][j];
				} else {
					count++;
				}
			}
			if (count === 0) {
				newCentroids[i] = centroids[i];
			}
		}

		if (JSON.stringify(newCentroids) !== JSON.stringify(centroids)) {
			centroids = newCentroids;
			change = true;
		}
	}
	return centroids;
};
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
 * @param {Array<Array<number>>} pixelArray - Array of arrays of rgb data
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

const CustomPlot = ({ pixelData, setCentroidRGB }) => {
	console.log("pixelData: ", pixelData);
	if (pixelData.length === 0) {
		return <></>;
	}
	const pixelDataShrink = downSample(pixelData, 15);

	const centroids = kMeans(pixelDataShrink, 3);

	const [xVal, yVal, zVal] = fillXYZ(pixelDataShrink);
	const [centroidX, centroidY, centroidZ] = fillXYZ(centroids);
	const rgb = formatRGB([xVal, yVal, zVal]);
	const centroidRGB = formatRGB([centroidX, centroidY, centroidZ]);
	setCentroidRGB(centroidRGB);

	const trace1 = {
		type: "scatter3d",
		mode: "markers",
		x: centroidX,
		y: centroidY,
		z: centroidZ,
		marker: {
			size: 20,
			color: centroidRGB,
			line: {
				width: 10,
				color: "white",
			},
		},
	};
	const trace2 = {
		type: "scatter3d",
		mode: "markers",
		x: xVal,
		y: yVal,
		z: zVal,
		marker: {
			size: 3,
			color: rgb,
			opacity: 0.9,
		},
	};

	return (
		<>
			<Plot
				data={[trace1, trace2]}
				layout={{
					autosize: false,
					width: "100%",
					height: "100%",
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
