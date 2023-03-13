export function rgbToHex(rgbStr) {
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
}
