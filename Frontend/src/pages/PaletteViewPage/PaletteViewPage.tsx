import React, { useState } from "react";
import { useAppContext } from "../../Contexts/AppContext";
import { ActionButton, ImageUploadForm, WidgetPane } from "../../components";
import ImagePane from "../../components/ImagePane/ImagePane";
import usePaletteSubmission from "../../hooks/usePaletteSubmission";
import LoadingModal from "../../components/LoadingModal";

const PaletteView: React.FC = () => {
	const [colorCount, setColorCount] = useState<number>(2);
	const { handlePaletteSubmission, isProcessing, setShowModal } =
		usePaletteSubmission();
	const {
		activeImageUrl,
		activePalette,
		setModalContent,
		imageProcessorEndpoint,
	} = useAppContext();
	const handleShowSubmissionForm = () => {
		setModalContent(() => (
			<ImageUploadForm
				url={imageProcessorEndpoint}
				onSubmit={handlePaletteSubmission}
				onSuccess={() => setShowModal(false)}
			/>
		));
		setShowModal(true);
	};

	return (
		<>
			{isProcessing && <LoadingModal />}
			<div className="w-full h-full flex flex-col bg-white">
				<div className="w-full flex flex-col lg:grid lg:grid-cols-2 flex-grow">
					<ImagePane
						uploadedImage={activeImageUrl}
						className="max-h-[100px] lg:max-h-none lg:p-12 p-2 "
					/>
					{activePalette?.clusterData ? (
						<WidgetPane
							className=""
							clusterData={activePalette.clusterData}
							colorCount={colorCount}
							setColorCount={setColorCount}
						/>
					) : (
						<div className="font-bold text-xl text-dark border h-full w-full flex flex-col items-center justify-center">
							to generate a new palette, press the upload new
							image button
						</div>
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
				</div>
			</div>
		</>
	);
};

export default PaletteView;
