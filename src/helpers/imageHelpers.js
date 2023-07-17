export const createImage = (src, onLoad) => {
	const img = new Image();
	img.onload = onLoad;
	img.src = src;
	return img;
};

export const handleResizeImage = (originalImg) => {
	// Create an intermediate canvas and draw the resized image on it
	const resizeCanvas = document.createElement("canvas");
	resizeCanvas.width = 200;
	resizeCanvas.height = 200;
	const resizeCtx = resizeCanvas.getContext("2d");
	const scale = resizeCanvas.height / originalImg.height;
	resizeCtx.drawImage(
		originalImg,
		0,
		0,
		originalImg.width * scale,
		originalImg.height * scale
	);
	return resizeCanvas.toDataURL().split(",")[1]; // Convert resized image to base64
};

export const drawImageOnCanvas = (img, canvas) => {
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	// Clearing the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const scale = canvas.height / img.height;
	canvas.width = img.width * scale;
	canvas.height = img.height * scale;
	// Drawing the image on the canvas
	ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
	return ctx.getImageData(0, 0, canvas.width, canvas.height, {
		willReadFrequently: true,
	}).data;
};
export const rgbToHex = (rgbStr) => {
	if (!rgbStr) {
		return "";
	}
	const rgbValues = rgbStr.split(",");
	const hexValues = rgbValues.map((rgbValue) => {
		const trimmedValue = rgbValue.trim().replace("rgb(", "").replace(")", "");
		const roundedValues = trimmedValue
			.split(",")
			.map((value) => Math.round(parseFloat(value)));
		const hex = roundedValues.map((value) => {
			const hexValue = value.toString(16).padStart(2, "0");
			return hexValue;
		});
		return "#" + hex.join("");
	});
	return hexValues.join(", ");
};

export const hexArrayToRGBArray = (hexArray) => {
	function hexToRGB(hex) {
		if (!hex) return [];

		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b;
		});

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
					parseInt(result[1], 16),
					parseInt(result[2], 16),
					parseInt(result[3], 16),
			  ]
			: [];
	}

	if (!Array.isArray(hexArray)) return [];

	const rgbArray = hexArray.map((hex) => hexToRGB(hex));

	// Split the RGB arrays into separate arrays for R, G, B
	const rValues = rgbArray.map((color) => color[0]);
	const gValues = rgbArray.map((color) => color[1]);
	const bValues = rgbArray.map((color) => color[2]);

	return [rValues, gValues, bValues];
};

// Pixel Manipulation Functions

/**
 * Transposes a given matrix
 *
 * @param {Array<Array<number>>} matrix - 2D array to be transposed
 * @returns {Array<Array<number>>} - Transposed matrix
 */
export const transpose = (matrix) => {
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
export const fillXYZ = (pixelArray) => {
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
export const formatRGB = (rgb) => {
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
export const downSample = (arr, factor) => {
	const newArray = [];
	for (let i = 0; i < arr.length; i++) {
		if (i % factor === 0) {
			newArray.push(arr[i]);
		}
	}
	return newArray;
};
export const processPixels = (data) => {
	if (data.length < 1) {
		return [];
	}
	const pixelDataShrink = downSample(data, 60); // downsample according to 4 color channels (r,g,b,a)
	const xVal = [];
	const yVal = [];
	const zVal = [];
	for (let i = 0; i < pixelDataShrink.length; i += 4) {
		// iterate over data in steps of 4
		xVal.push(pixelDataShrink[i]);
		yVal.push(pixelDataShrink[i + 1]);
		zVal.push(pixelDataShrink[i + 2]);
		// We're skipping alpha value i+3 because typically in an RGB plot, we don't consider transparency
	}
	const rgb = formatRGB([xVal, yVal, zVal]);
	console.log("processing");
	return [rgb, xVal, yVal, zVal];
};
