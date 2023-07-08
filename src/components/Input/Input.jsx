import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CentroidContext } from "../../Contexts/CentroidContext";
import AppContext from "../../Contexts/AppContext";
import { postImage } from "../../services/imageProcessingService";
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

				// Use postImage service
				const data = await postImage(resizedBase64Image);
				setCentroidArray(data);

				if (window.location.pathname !== "/app/palette-view") {
					navigate("/app/palette-view");
				}
				setIsLoading(false);
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
