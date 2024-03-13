import React, { useState } from "react";
import { useAppContext } from "../../Contexts/AppContext";
import { ActionButton, ImageUploadForm, WidgetPane } from "../../components";
import ImagePane from "../../components/ImagePane/ImagePane";
import usePaletteSubmission from "../../hooks/usePaletteSubmission";

const PaletteView: React.FC = () => {
	const [colorCount, setColorCount] = useState<number>(2);
	const {
		handlePaletteSubmission,
		isProcessing,
		processingError,
		error,
		setShowModal,
	} = usePaletteSubmission();
	const {
		activeImageUrl,
		activePalette,
		setModalContent,
		imageProcessorEndpoint,
	} = useAppContext();
	console.log("isProcessing: ", isProcessing);
	const handleShowSubmissionForm = () => {
		setModalContent(() => (
			<ImageUploadForm
				url={imageProcessorEndpoint}
				onSubmit={handlePaletteSubmission} // Pass handlePaletteSubmission directly to the form
				// onClose and onSuccess will be handled inside the form now
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
						<WidgetPane
							clusterData={activePalette.clusterData}
							colorCount={colorCount}
							setColorCount={setColorCount}
						/>
					)}
				</div>
				<div className="flex items-center gap-2 bg-dark justify-center h-48">
					<ActionButton
						label="copy palette"
						className="p-2 hover:bg-theme1 border border-white hover:border-theme1 transition rounded text-white"
						onClick={() => {
							if (activePalette?.clusterData?.clusters) {
								const textToCopy =
									activePalette.clusterData.clusters[
										colorCount
									].toString();
								navigator.clipboard
									.writeText(textToCopy)
									.then(() => {})
									.catch((err) => {
										console.error(
											"Failed to copy palette:",
											err
										);
									});
							}
						}}
					/>

					<ActionButton
						label="upload new image"
						className="p-2 hover:bg-theme1 border border-white hover:border-theme1 transition rounded text-white"
						onClick={handleShowSubmissionForm}
					/>

					{isProcessing && <p>Loading...</p>}
					{processingError && <p>Error: {error?.message}</p>}
				</div>
			</div>
		</>
	);
};

export default PaletteView;
