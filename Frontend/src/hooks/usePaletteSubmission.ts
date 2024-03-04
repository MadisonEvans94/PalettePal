import { useAppContext } from "../Contexts/AppContext";
import { processImage } from "../api/apiFunctions";
import { useNavigate } from "react-router-dom";
const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

const usePaletteSubmission = () => {
	const navigate = useNavigate();
	const { setActivePalette, setActiveImageUrl, setShowModal } =
		useAppContext();

	const handleSuccess = (uploadedFile: File, redirectUrl: string | null) => {
		const activeImageUrl = URL.createObjectURL(uploadedFile);
		setActiveImageUrl(activeImageUrl);
		if (redirectUrl) navigate("/palette-view");
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
				setActivePalette({
					name: `Image - ${new Date().toISOString()}`,
					date: new Date().toISOString().slice(0, 10),
					id: null,
					clusterData: clusterData,
					imageUrl: "",
				});
			}
			handleSuccess(imgFile, "/palette-view");
		}
	};
	return { handlePaletteSubmission, setShowModal };
};
export default usePaletteSubmission;
