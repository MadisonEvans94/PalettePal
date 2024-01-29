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

export const deletePalette = async (url: string, id: number) => {};

export const createPalette = async (
	palette: Palette
): Promise<Palette | null> => {
	try {
		const token = localStorage.getItem("access_token");

		// Check if the token is available
		if (token) {
			console.log("token is: ", token);
		}
		if (!token) {
			throw new Error("Authorization token is not available");
		}

		const response = await fetch("http://127.0.0.1:8000/palettes/create/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(palette),
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error("Server responded with an error:", response.status);
			return null;
		}
	} catch (error) {
		// If there's an error in the request, log it and return null
		console.error("Error creating the palette:", error);
		return null;
	}
};
export const editProfile = async (
	event: React.FormEvent,
	url: string,
	user_id: number
	// additional fields that will be editable for profile
) => {};

export const getPalettes = async (): Promise<any> => {
	try {
		const token = localStorage.getItem("access_token");

		// Check if the token is available
		if (!token) {
			throw new Error("No access token available.");
		}

		const response = await fetch("http://127.0.0.1:8000/palettes/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data; // This will be an array of palettes
		} else {
			// Handle HTTP errors, e.g., unauthorized, not found, etc.
			console.error("Failed to fetch palettes:", response.status);
			return null;
		}
	} catch (error) {
		console.error("Error fetching palettes:", error);
		return null;
	}
};

export const editPaletteName = async (
	url: string,
	user_id: number,
	palette_name: string
) => {};
