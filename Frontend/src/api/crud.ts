export const processImage = async (
	event: React.FormEvent,
	imgFile: File | null,
	url: string
) => {
	event.preventDefault();
	if (!imgFile) {
		alert("Please select an image first.");
		return;
	}

	const formData = new FormData();
	formData.append("image", imgFile);

	try {
		console.log(
			`Posting to server...\n\nmethod: POST\ncredentials: 'include'\nbody: ${formData}`
		);
		const response = await fetch(url, {
			method: "POST",

			body: formData,
		});

		if (!response.ok) {
			throw new Error("Image upload failed :(");
		}

		const result = await response.json();
		console.log("Upload successful", result);
		return result;
	} catch (error) {
		console.error("Error during upload:", error);
	}
};
