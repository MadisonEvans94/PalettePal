export const compressImage = (originalFile: File): Promise<File> => {
	const maxWidth = 1920; // Maximum width for the image
	const maxHeight = 1080; // Maximum height for the image
	const fileName = originalFile.name; // Get the name of the uploaded file
	const fileType = originalFile.type; // Get the MIME type of the uploaded file

	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = URL.createObjectURL(originalFile);
		image.onload = () => {
			const canvas = document.createElement("canvas");
			let { width, height } = image;

			if (width > height) {
				if (width > maxWidth) {
					height = height * (maxWidth / width);
					width = maxWidth;
				}
			} else {
				if (height > maxHeight) {
					width = width * (maxHeight / height);
					height = maxHeight;
				}
			}

			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("Failed to get canvas context"));
				return;
			}
			ctx.drawImage(image, 0, 0, width, height);
			ctx.canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Canvas is empty"));
					return;
				}
				const file = new File([blob], fileName, {
					type: fileType,
					lastModified: Date.now(),
				});
				resolve(file);
			}, fileType);
		};
		image.onerror = (error) => reject(error);
	});
};
