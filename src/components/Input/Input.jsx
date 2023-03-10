import React from "react";

import { useRef } from "react";
import { reshapeImageData } from "../../helpers/imageTransformer";

const Input = ({ setPixelDataForParent, setColorsNeedUpdate, setImgFile }) => {
	const canvasRef = useRef(null);

	const handleFileChange = (e) => {
		const reader = new FileReader();
		setColorsNeedUpdate(true);
		//	formats the canvas and puts the uploaded image onto it
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;
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
				console.log("input component rendering");
			};
			setImgFile(img);
		};

		reader.readAsDataURL(e.target.files[0]);
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
