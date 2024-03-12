import { useAppContext } from "../Contexts/AppContext";
import { processImage } from "../api/apiFunctions";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

export const compressImage = (originalFile: File): Promise<File> => {
	const maxWidth = 1920; // Maximum width for the image
	const maxHeight = 1080; // Maximum height for the image
	const fileName = originalFile.name; // Get the name of the uploaded file
	const fileType = originalFile.type; // Get the MIME type of the uploaded file

	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = URL.createObjectURL(originalFile);
		image.onload = () => {
			const canvas = document.createElement("canvas");
			let { width, height } = image;

			if (width > height) {
				if (width > maxWidth) {
					height = height * (maxWidth / width);
					width = maxWidth;
				}
			} else {
				if (height > maxHeight) {
					width = width * (maxHeight / height);
					height = maxHeight;
				}
			}

			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("Failed to get canvas context"));
				return;
			}
			ctx.drawImage(image, 0, 0, width, height);
			ctx.canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Canvas is empty"));
					return;
				}
				const file = new File([blob], fileName, {
					type: fileType,
					lastModified: Date.now(),
				});
				resolve(file);
			}, fileType);
		};
		image.onerror = (error) => reject(error);
	});
};

const usePaletteSubmission = () => {
	const navigate = useNavigate();
	const { setActivePalette, setActiveImageUrl, setShowModal } =
		useAppContext();

	const handleSuccess = (uploadedFile: File, redirectUrl: string | null) => {
		const activeImageUrl = URL.createObjectURL(uploadedFile);
		localforage
			.setItem("cachedImage", uploadedFile)
			.then(() => {
				if (redirectUrl) navigate("/palette-view");
			})
			.catch((err) => console.error("image caching failed", err));
		setActiveImageUrl(activeImageUrl);
	};

	const handlePaletteSubmission = async (
		event: React.FormEvent,
		imgFile: File | null,
		url: string = imageProcessorEndpoint
	) => {
		event.preventDefault();
		if (imgFile) {
			compressImage(imgFile)
				.then(async (compressedFile) => {
					try {
						const clusterData = await processImage(
							event,
							compressedFile,
							url
						);
						if (clusterData) {
							const activePalette = {
								name: `Image - ${new Date().toISOString()}`,
								date: new Date().toISOString().slice(0, 10),
								id: null,
								clusterData: clusterData,
								imageUrl: "",
							};
							setActivePalette(activePalette);
							await localforage.setItem(
								"activePalette",
								activePalette
							);
							handleSuccess(compressedFile, "/palette-view");
						}
					} catch (err) {
						console.error(
							"Error processing or caching the image",
							err
						);
					}
				})
				.catch((error) => {
					console.error("Error compressing image: ", error);
				});
		}
	};
	return { handlePaletteSubmission, setShowModal };
};

export default usePaletteSubmission;
