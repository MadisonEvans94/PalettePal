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
	// Get image data
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height, {
		willReadFrequently: true,
	}).data;

	// Remove alpha values
	let rgbData = [];
	for (let i = 0; i < imageData.length; i += 3) {
		rgbData.push(imageData[i], imageData[i + 1], imageData[i + 2]);
	}
	return rgbData;
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

function constructRGBChannels(arr) {
	// Create arrays for each channel
	let r = [],
		g = [],
		b = [];
	// Iterate over array, skipping every 4th element
	for (let i = 0; i < arr.length; i += 4) {
		r.push(arr[i]);
		g.push(arr[i + 1]);
		b.push(arr[i + 2]);
	}
	// Return an array containing the individual channel arrays
	return [r, g, b];
}

export function formatBGR(channels) {
	let formatted = [];

	// Iterate over the length of the subarrays (assuming all have same length)
	for (let i = 0; i < channels[0].length; i++) {
		// Construct the BGR string for each pixel and push it to the output array
		formatted.push(
			`rgb(${channels[0][i]}, ${channels[1][i]}, ${channels[2][i]})`
		);
	}

	return formatted;
}

export function downSample(arr, factor) {
	const newArray = [];
	for (let i = 0; i < arr.length; i++) {
		if (i % factor === 0) {
			newArray.push(arr[i]);
		}
	}
	return newArray;
}

export const processPixels = (pixelData) => {
	if (pixelData.length < 1) {
		return [];
	}
	console.log(pixelData, "processPixels");
	// const pixelTransposed = transpose(pixelData);
	// const pixelDataShrink = downSample(pixelData, 1);
	const [xVal, yVal, zVal] = constructRGBChannels(pixelData);
	console.log(xVal, "xVal");
	const rgb = formatBGR([xVal, yVal, zVal]);
	console.log(rgb, "RGB FORMATTED");

	return [rgb, xVal, yVal, zVal];
};
