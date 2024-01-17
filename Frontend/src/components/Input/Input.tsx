import React, { useRef, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { reshapeImageData } from "../../helpers/imageTransformer";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { PixelData, ImageFile } from "../../types";

interface InputProps {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setPixelDataForParent: React.Dispatch<React.SetStateAction<PixelData>>;
	setImgFile: React.Dispatch<React.SetStateAction<ImageFile | null>>;
	className: string;
}

const Input: React.FC<InputProps> = ({
	setIsLoading,
	setPixelDataForParent,
	setImgFile,
}) => {
	const { setCentroidArray } = useContext(CentroidContext);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const navigate = useNavigate();

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setImgFile(file); // Set the image file here

			const reader = new FileReader();
			reader.onerror = () => {
				console.error("Error reading the file.");
				setIsLoading(false); // Stop loading if there's an error
			};

			reader.onloadend = async () => {
				const originalBase64Image = reader.result;
				if (typeof originalBase64Image === "string") {
					const originalImg = new Image();
					originalImg.src = originalBase64Image;
					originalImg.onload = async () => {
						// Once the original image is loaded, we can set the pixel data
						const canvas = canvasRef.current;
						if (canvas) {
							const ctx = canvas.getContext("2d");
							if (ctx) {
								canvas.width = originalImg.width;
								canvas.height = originalImg.height;
								ctx.drawImage(originalImg, 0, 0);
								const imageData = ctx.getImageData(
									0,
									0,
									canvas.width,
									canvas.height
								);
								const pixelArray = reshapeImageData(
									imageData.data
								);
								setPixelDataForParent(pixelArray); // Set the processed pixel data here

								// Resize logic (if needed) and AWS fetch request should be here
								let resizedBase64Image = canvas
									.toDataURL("image/png")
									.split(",")[1];
								try {
									const res = await fetch(
										// FIXME: env variable
										process.env.REACT_APP_AWS_ENDPOINT!,
										{
											method: "POST",
											body: JSON.stringify({
												image: resizedBase64Image,
											}),
											headers: {
												"Content-Type":
													"application/json",
											},
										}
									);
									if (!res.ok) {
										throw new Error(
											`HTTP error! status: ${res.status}`
										);
									}
									const data = await res.json();
									const parsedData = JSON.parse(data.body);
									setCentroidArray(parsedData.centroids); // Assuming your server response has a 'centroids' key
									navigate("/dashboard"); // Navigate to dashboard after setting centroids
								} catch (error) {
									console.error(
										"Error fetching data:",
										error
									);
								} finally {
									setIsLoading(false);
								}
							}
						}
					};
					originalImg.onerror = () => {
						console.error("Error loading the image");
						setIsLoading(false);
					};
				} else {
					console.error("FileReader result is not a string");
					setIsLoading(false);
				}
			};

			reader.readAsDataURL(file);
		} else {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<input
				className="hidden"
				type="file"
				id="image-input"
				accept="image/jpeg, image/png, image/webp"
				onChange={handleFileChange}
			/>
			<label
				htmlFor="image-input"
				className="border p-4 rounded-md cursor-pointer text-white hover:bg-white hover:text-[#0f0f0f] transition"
			>
				Select file
			</label>
			<canvas ref={canvasRef} style={{ display: "none" }} />
		</div>
	);
};

export default Input;
