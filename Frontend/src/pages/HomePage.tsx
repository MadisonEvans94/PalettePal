import React from "react";
import ImageUploadForm from "../components/ImageUploadForm";
import { useAppContext } from "../Contexts/AppContext";
import { ReactComponent as PalettePalHeader } from "../assets/icons/PalettePalHeader.svg";
import usePaletteSubmission from "../hooks/usePaletteSubmission";
const HomePage: React.FC = () => {
	const { handlePaletteSubmission } = usePaletteSubmission();
	const { imageProcessorEndpoint, setModalContent, setShowModal } =
		useAppContext();

	const handleShowSubmissionForm = () => {
		setModalContent(() => (
			<ImageUploadForm
				url={imageProcessorEndpoint}
				onSubmit={handlePaletteSubmission}
				onClose={() => console.log("closing modal")}
				onSuccess={() => setShowModal(false)}
			/>
		));
		setShowModal(true);
	};

	return (
		<div className=" h-full flex flex-col items-center justify-center">
			<PalettePalHeader className="w-full h-80 flex items-center justify-center mb-24 text-3xl" />
			<button
				className="border p-2 rounded text-white border-white hover:bg-white hover:white hover:text-black transition"
				onClick={handleShowSubmissionForm}
			>
				Create A New Palette
			</button>
		</div>
	);
};

export default HomePage;
