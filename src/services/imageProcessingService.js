const postImage = async (resizedBase64Image) => {
	try {
		const res = await fetch(
			"https://du65t1mu0a.execute-api.us-east-2.amazonaws.com/production/image-processor",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ image: resizedBase64Image }), // Send the resized base64 image
			}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

export { postImage };
