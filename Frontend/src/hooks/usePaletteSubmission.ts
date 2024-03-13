import { useAppContext } from "../Contexts/AppContext";
import { processImage } from "../api/apiFunctions";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ClusterData, Palette } from "../types";
import { compressImage } from "../utils/compressImage";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

export const usePaletteSubmission = () => {
	const navigate = useNavigate();
	const { setActivePalette, setActiveImageUrl, setShowModal } =
		useAppContext();

	const mutation = useMutation<ClusterData, Error, File>(
		async (imgFile: File) => {
			const compressedFile = await compressImage(imgFile);
			return await processImage(compressedFile, imageProcessorEndpoint);
		}
	);

	const handleSuccess = (data: ClusterData, file: File) => {
		const activePalette: Palette = {
			name: `Image - ${new Date().toISOString()}`,
			date: new Date().toISOString().slice(0, 10),
			id: null,
			clusterData: data,
			imageUrl: "",
		};
		setActivePalette(activePalette);
		navigate("/palette-view");
		const activeImageUrl = URL.createObjectURL(file);
		setActiveImageUrl(activeImageUrl);
	};

	const handlePaletteSubmission = async (
		event: React.FormEvent<HTMLFormElement>,
		imgFile: File | null
	) => {
		event.preventDefault();
		if (imgFile) {
			mutation.mutate(imgFile, {
				onSuccess: (data) => handleSuccess(data, imgFile),
				onError: (error) => {
					console.error(
						"Error in processing or caching the image",
						error
					);
				},
			});
		}
	};

	return {
		handlePaletteSubmission,
		setShowModal,
		isProcessing: mutation.isLoading,
		processingError: mutation.isError,
		error: mutation.error,
	};
};

export default usePaletteSubmission;
