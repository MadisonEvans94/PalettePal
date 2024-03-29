import React from "react";
import ImageUploadForm from "../../components/ImageUploadForm";
import { useAppContext } from "../../Contexts/AppContext";
import { ReactComponent as PalettePalHeader } from "../../assets/icons/PalettePalHeader.svg";
import usePaletteSubmission from "../../hooks/usePaletteSubmission";
import LoadingModal from "../../components/LoadingModal";
const HomePage: React.FC = () => {
	const { handlePaletteSubmission, isProcessing, error } =
		usePaletteSubmission();
	const { imageProcessorEndpoint, setModalContent, setShowModal } =
		useAppContext();

	const handleShowSubmissionForm = () => {
		setModalContent(() => (
			<>
				<ImageUploadForm
					url={imageProcessorEndpoint}
					onSubmit={handlePaletteSubmission}
					onSuccess={() => setShowModal(false)}
				/>
			</>
		));
		setShowModal(true);
	};
	console.log(isProcessing);
	return (
		<div className=" h-full flex flex-col items-center justify-center">
			{isProcessing && <LoadingModal />}
			<PalettePalHeader className="w-full md:px-4 px-6 h-80 flex items-center justify-center mb-12 md:mb-24 text-3xl text-center" />
			<button
				className="border text-sm md:text-md p-2 rounded text-white border-white hover:bg-white hover:white hover:text-black transition"
				onClick={handleShowSubmissionForm}
			>
				Create A New Palette
			</button>
			<p className="w-full px-4 pb-6 md:max-w-[700px] xl:max-w-[1000px] text-sm md:text-lg mt-12 pt-12 text-white text-center">
				Welcome to Palette Pal! Upload an Image to get a custom color
				palette
			</p>
		</div>
	);
};

export default HomePage;
