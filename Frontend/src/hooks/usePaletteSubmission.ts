import { useAppContext } from "../Contexts/AppContext";
import { processImage } from "../api/apiFunctions";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

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
			const clusterData = await processImage(event, imgFile, url);
			if (clusterData) {
				const activePalette = {
					name: `Image - ${new Date().toISOString()}`,
					date: new Date().toISOString().slice(0, 10),
					id: null,
					clusterData: clusterData,
					imageUrl: "",
				};
				setActivePalette(activePalette);
				localforage
					.setItem("activePalette", activePalette)
					.catch((err) => console.error("caching failed", err));
			}
			handleSuccess(imgFile, "/palette-view");
		}
	};
	return { handlePaletteSubmission, setShowModal };
};
export default usePaletteSubmission;
