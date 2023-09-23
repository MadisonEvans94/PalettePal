function transformArray(inputArray, dividend) {
	// Check if the inputArray length is divisible by the dividend, throw an error if not
	if (inputArray.length % dividend !== 0) {
		throw new Error("choose a different dividend");
	}

	const result = [];
	for (let i = 0; i < inputArray.length; i += dividend) {
		result.push(inputArray.slice(i, i + dividend));
	}
	return result;
}

function reshapeImageData(imageData) {
	const result = [];
	// Iterating over every 4 elements to get the RGB values
	for (let i = 0; i < imageData.length; i += 4) {
		// Pushing the first 3 elements (representing RGB values)
		result.push(...imageData.slice(i, i + 3));
	}
	// Transforming the 1D array into a 2D array of RGB values
	const rgbArray = transformArray(result, 3);
	return rgbArray;
}

export { reshapeImageData };
