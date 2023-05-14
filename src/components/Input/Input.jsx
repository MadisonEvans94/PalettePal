import React from "react";

import { useRef } from "react";
import { reshapeImageData } from "../../helpers/imageTransformer";

const Input = ({ setPixelDataForParent, setImgFile }) => {
	const canvasRef = useRef(null);

	const handleFileChange = async (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();

		reader.onerror = (error) => {
			console.error("Error reading the file:", error);
		};

		reader.onloadend = async () => {
			const originalBase64Image = reader.result;
			let resizedBase64Image;

			// Create an intermediate canvas and draw the resized image on it
			const resizeCanvas = document.createElement("canvas");
			resizeCanvas.width = 200;
			resizeCanvas.height = 200;
			const resizeCtx = resizeCanvas.getContext("2d");

			const originalImg = new Image();
			originalImg.src = originalBase64Image;
			originalImg.onload = async () => {
				let scale;
				if (originalImg.width > originalImg.height) {
					scale = resizeCanvas.width / originalImg.width;
				} else {
					scale = resizeCanvas.height / originalImg.height;
				}
				resizeCtx.drawImage(
					originalImg,
					0,
					0,
					originalImg.width * scale,
					originalImg.height * scale
				);
				resizedBase64Image = resizeCanvas.toDataURL().split(",")[1]; // Convert resized image to base64

				try {
					const res = await fetch(
						"https://s1sac4ihw6.execute-api.us-east-2.amazonaws.com/palette_pal_tester/kmeans",
						{
							method: "POST",
							body: JSON.stringify({ image: resizedBase64Image }), // Send the resized base64 image
						}
					);

					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}

					const data = await res.json();
					const parsedData = JSON.parse(data.body);
					console.log(parsedData, "FROM AWS");
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};

			const img = new Image();
			img.src = reader.result;
			img.onload = () => {
				const canvas = canvasRef.current;
				// Setting the canvas dimensions to 500x500
				canvas.width = 400;
				canvas.height = 400;

				const ctx = canvas.getContext("2d", { willReadFrequently: true });
				// Clearing the canvas
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				let scale;
				// Scaling the image to fit the canvas
				if (img.width > img.height) {
					scale = canvas.width / img.width;
				} else {
					scale = canvas.height / img.height;
				}
				canvas.width = img.width * scale;
				canvas.height = img.height * scale;
				// Drawing the image on the canvas
				ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
				const imageData = ctx.getImageData(
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height,
					{ willReadFrequently: true }
				);

				const pixelArray = reshapeImageData(imageData.data);

				setPixelDataForParent(pixelArray);
			};
			setImgFile(img);
		};

		reader.readAsDataURL(file);
	};

	return (
		<div className="">
			<input
				className="hidden"
				type="file"
				id="image-input"
				accept="image/jpeg, image/png, image/webp"
				onChange={handleFileChange}
			/>
			<label
				for="image-input"
				className="border p-4 rounded-md cursor-pointer hover:bg-white hover:text-black transition">
				Select file
			</label>
			<canvas ref={canvasRef} style={{ display: "none" }} />
		</div>
	);
};

export default Input;
