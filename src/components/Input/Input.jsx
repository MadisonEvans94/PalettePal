import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CentroidContext } from "../../Contexts/CentroidContext";
import AppContext from "../../Contexts/AppContext";
const InputButton = ({ buttonText, styleProp }) => {
	const { setIsLoading, setPixelData, setImgFile } = useContext(AppContext);
	const { setCentroidArray } = useContext(CentroidContext);
	const canvasRef = useRef(null);
	const navigate = useNavigate();

	const createImage = (src, onLoad) => {
		const img = new Image();
		img.onload = onLoad;
		img.src = src;
		return img;
	};

	const handleResizeImage = (originalImg) => {
		// Create an intermediate canvas and draw the resized image on it
		const resizeCanvas = document.createElement("canvas");
		resizeCanvas.width = 200;
		resizeCanvas.height = 200;
		const resizeCtx = resizeCanvas.getContext("2d");
		const scale = resizeCanvas.height / originalImg.height;
		resizeCtx.drawImage(
			originalImg,
			0,
			0,
			originalImg.width * scale,
			originalImg.height * scale
		);
		return resizeCanvas.toDataURL().split(",")[1]; // Convert resized image to base64
	};

	const drawImageOnCanvas = (img, canvas) => {
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		// Clearing the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const scale = canvas.height / img.height;
		canvas.width = img.width * scale;
		canvas.height = img.height * scale;
		// Drawing the image on the canvas
		ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
		return ctx.getImageData(0, 0, canvas.width, canvas.height, {
			willReadFrequently: true,
		}).data;
	};

	const handleFileChange = async (e) => {
		setIsLoading(true);
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onerror = (error) => console.error("Error reading the file:", error);
		reader.onloadend = async () => {
			const originalBase64Image = reader.result;
			const originalImg = createImage(originalBase64Image, async () => {
				const resizedBase64Image = handleResizeImage(originalImg);

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
					setCentroidArray(data);
					if (window.location.pathname !== "/app/palette-view") {
						navigate("/app/palette-view");
					}
					setIsLoading(false);
				} catch (error) {
					console.error("Error fetching data:", error);
					setIsLoading(false);
				}
			});

			const img = createImage(reader.result, () => {
				const canvas = canvasRef.current;
				// Setting the canvas dimensions to 500x500
				canvas.width = 400;
				canvas.height = 400;
				const pixelArray = drawImageOnCanvas(img, canvas);
				setPixelData(pixelArray);
				setImgFile(img);
			});
		};
		reader.readAsDataURL(file);
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
			<label htmlFor="image-input" className={styleProp}>
				{buttonText}
			</label>
			<canvas ref={canvasRef} style={{ display: "none" }} />
		</div>
	);
};

export default InputButton;
