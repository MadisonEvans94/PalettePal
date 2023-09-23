function hexArrayToRGBArray(hexArray) {
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
}

export default hexArrayToRGBArray;
