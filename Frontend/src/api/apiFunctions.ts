import { Palette } from "../types";

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

export const deletePalette = async (url: string, id: number) => {
	return;
};

export const savePalette = async (
	url: string,
	palette: Palette,
	user_id: number
) => {
	return;
};

export const editProfile = async (
	event: React.FormEvent,
	url: string,
	user_id: number
	// additional fields that will be editable for profile
) => {
	return;
};

export const getPalettes = async (url: string, user_id: number) => {
	return;
};
