import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CentroidContext } from "../Contexts/CentroidContext";
import AppContext from "../Contexts/AppContext";
import { postImage } from "../services/imageProcessingService";
import { AccountContext } from "../components/Account";
import {
	createImage,
	handleResizeImage,
	drawImageOnCanvas,
} from "../helpers/imageHelpers";

const useFileHandler = () => {
	const { setIsLoading, setPixelData, setImgFile } = useContext(AppContext);
	const { tokens } = useContext(AccountContext);

	const { setCentroidArray } = useContext(CentroidContext);
	const canvasRef = useRef(null);
	const navigate = useNavigate();

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) {
			// No file was selected, just return
			return;
		}
		setIsLoading(true);
		const reader = new FileReader();
		reader.onerror = (error) => console.error("Error reading the file:", error);
		reader.onloadend = async () => {
			const originalBase64Image = reader.result;
			const originalImg = createImage(originalBase64Image, async () => {
				const resizedBase64Image = handleResizeImage(originalImg);

				// Use postImage service
				console.log("from the useFileHandler", tokens);
				const data = await postImage(resizedBase64Image, tokens);
				setCentroidArray(data);

				if (window.location.pathname !== "/palette-view") {
					navigate("/palette-view");
				}
				setIsLoading(false);
			});

			const img = createImage(originalBase64Image, () => {
				const canvas = canvasRef.current;
				canvas.width = 400;
				canvas.height = 400;
				const pixelArray = drawImageOnCanvas(img, canvas);
				setPixelData(pixelArray);
				setImgFile(img);
			});
		};
		reader.readAsDataURL(file);
	};

	return { handleFileChange, canvasRef };
};

export default useFileHandler;
