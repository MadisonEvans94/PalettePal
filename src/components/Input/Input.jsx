/**
 * This code is a React component that implements an input field that allows a user to select an image file. The selected image file is processed and its data is used to render the image on a canvas element.

transformArray is a helper function that takes an array inputArray and divides it into smaller arrays of length dividend. If inputArray.length is not divisible by dividend, an error is thrown.

reshapeImageData is a helper function that takes an imageData array and returns an array of RGB color values. This function calls transformArray to divide the imageData array into arrays of length 3, which represent RGB values for each pixel in the image.

The Input component uses the useRef hook to create a reference to the canvas element. The handleFileChange function is called when the input field is changed and a new image file is selected. This function uses the FileReader API to read the image file and render it on the canvas element. The FileReader API reads the image file as a data URL and sets it as the source of an Image object. When the image is loaded, it is drawn on the canvas element and its pixel data is retrieved using the getImageData method of the canvas' 2D rendering context. The pixel data is then processed using the reshapeImageData function to extract the RGB values and stored in an array called pixelArray. Finally, the setPixelDataForParent function is called and passed pixelArray as an argument, which sets the pixel data for the parent component.
 */

import React from "react";
import "./Input.css";
import { useRef } from "react";

/**
 * This function takes an inputArray and a dividend and returns a 2D array with each element of length `dividend`
 * @param {Array} inputArray - Array to be transformed
 * @param {number} dividend - Length of each element in the resulting 2D array
 * @throws {Error} Throws an error if the length of the inputArray is not divisible by the dividend
 * @returns {Array} 2D Array of inputArray elements, each of length `dividend`
 */
function transformArray(inputArray, dividend) {
	// Check if the inputArray length is divisible by the dividend, throw an error if not
	if (inputArray.length % dividend !== 0) {
		throw new Error("choose a different dividend");
	}

	const result = [];
	for (let i = 0; i < inputArray.length; i += dividend) {
		result.push(inputArray.slice(i, i + dividend));
	}
	return result;
}

/**
 * This function takes imageData, reshapes it into a 1D array, and returns the transformed array
 * @param {Array} imageData - 1D array of image data
 * @returns {Array} 2D Array of RGB values
 */
function reshapeImageData(imageData) {
	const result = [];
	// Iterating over every 4 elements to get the RGB values
	for (let i = 0; i < imageData.length; i += 4) {
		// Pushing the first 3 elements (representing RGB values)
		result.push(...imageData.slice(i, i + 3));
	}
	// Transforming the 1D array into a 2D array of RGB values
	const rgbArray = transformArray(result, 3);
	return rgbArray;
}

/**
 * Input component
 * @param {function} setPixelDataForParent - Function to set the pixel data for the parent component
 * @returns {JSX} Returns JSX for the Input component
 */
const Input = ({ setPixelDataForParent, setColorsNeedUpdate }) => {
	const canvasRef = useRef(null);

	/**
	 * Handles the file change event of the input element
	 * @param {Event} e - File change event
	 */
	const handleFileChange = (e) => {
		const reader = new FileReader();
		console.log("file updated");
		setColorsNeedUpdate(true);
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;
			img.onload = () => {
				const canvas = canvasRef.current;
				// Setting the canvas dimensions to 500x500
				canvas.width = 500;
				canvas.height = 500;

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
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div className="input-container">
			<input
				type="file"
				accept="image/jpeg, image/png"
				onChange={handleFileChange}
			/>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Input;
