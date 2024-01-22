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
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			method: "POST",
			body: formData,
		});
		console.log(response);

		if (!response.ok) {
			throw new Error("Image upload failed");
		}

		const result = await response.json();
		console.log("Upload successful", result);
		return result;
	} catch (error) {
		console.error("Error during upload:", error);
	}
};
