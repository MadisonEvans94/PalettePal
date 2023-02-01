import React from "react";
import "./Input.css";
import { useState, useRef } from "react";

//[ ] find a react equivalent to change event listener on input
function transformArray(inputArray, dividend) {
	// error handling
	if (inputArray.length % dividend !== 0) {
		throw new Error("choose a different dividend");
	}

	const result = [];
	for (let i = 0; i < inputArray.length; i += dividend) {
		result.push(inputArray.slice(i, i + dividend));
	}
	return result;
}

function reshapeImageData(imageData) {
	const result = [];
	for (let i = 0; i < imageData.length; i += 4) {
		result.push(...imageData.slice(i, i + 3));
	}
	const rgbArray = transformArray(result, 3);
	return rgbArray;
}

const Input = () => {
	const [pixelData, setPixelData] = useState(null);
	const canvasRef = useRef(null);

	const handleFileChange = (e) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();

			img.src = e.target.result;
			img.onload = () => {
				const ctx = canvasRef.current.getContext("2d");
				const scale = Math.min(
					canvasRef.current.width / img.width,
					canvasRef.current.height / img.height
				);
				const x = (canvasRef.current.width - img.width * scale) / 2;
				const y = (canvasRef.current.height - img.height * scale) / 2;
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

				const imageData = ctx.getImageData(
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height
				);

				const pixelArray = reshapeImageData(imageData.data);
				console.log(pixelArray[0]);
				setPixelData(pixelArray);
			};
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div>
			<input type="file" accept="image/jpeg" onChange={handleFileChange} />

			<canvas ref={canvasRef} />
		</div>
	);
};

export default Input;
