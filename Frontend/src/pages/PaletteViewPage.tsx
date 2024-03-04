import React from "react";
import { useAppContext } from "../Contexts/AppContext"; // Import useAppContext
import WidgetPane from "../components/WidgetPane";
import ActionButton from "../components/ActionButton";
import { ImagePaneProps } from "../types";
import ImageUploadForm from "../components/ImageUploadForm";
import usePaletteSubmission from "../hooks/usePaletteSubmission";
const PaletteView: React.FC = () => {
	const { handlePaletteSubmission } = usePaletteSubmission();
	const {
		activeImageUrl,
		activePalette,
		setShowModal,
		setModalContent,
		imageProcessorEndpoint,
	} = useAppContext();

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
		<>
			<div className="w-full h-full flex flex-col bg-white">
				<div className="w-full grid grid-cols-2 flex-grow">
					<ImagePane uploadedImage={activeImageUrl} />
					{activePalette?.clusterData && (
						<WidgetPane clusterData={activePalette.clusterData} />
					)}
				</div>
				<div className="flex items-center gap-2 bg-neutral-500 justify-center h-48">
					{/* TODO: make the copy button functional */}
					<ActionButton
						label="copy palette"
						className="p-2 bg-black rounded text-white"
						onClick={() => {
							console.log("copy palette");
						}}
					/>

					<ActionButton
						label="upload new image"
						className="p-2 bg-black rounded text-white"
						onClick={handleShowSubmissionForm}
					/>
				</div>
			</div>
		</>
	);
};

export default PaletteView;

const ImagePane: React.FC<ImagePaneProps> = ({ uploadedImage }) => {
	return (
		<div className="bg-gray-600 text-white h-full overflow-hidden relative flex justify-center items-center">
			{uploadedImage && (
				<img
					// TODO: Use IndexDB localforage to cache image
					src={uploadedImage}
					alt="Uploaded"
					className="absolute w-full h-full object-cover"
				/>
			)}
		</div>
	);
};
