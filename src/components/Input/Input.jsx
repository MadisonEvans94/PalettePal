import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CentroidContext } from "../../Contexts/CentroidContext";
import AppContext from "../../Contexts/AppContext";

// Import the helper functions
import {
	createImage,
	handleResizeImage,
	drawImageOnCanvas,
} from "../../helpers/imageHelpers";

const InputButton = ({ buttonText, styleProp }) => {
	const { setIsLoading, setPixelData, setImgFile } = useContext(AppContext);
	const { setCentroidArray } = useContext(CentroidContext);
	const canvasRef = useRef(null);
	const navigate = useNavigate();

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

			const img = createImage(originalBase64Image, () => {
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
