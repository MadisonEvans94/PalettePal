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
