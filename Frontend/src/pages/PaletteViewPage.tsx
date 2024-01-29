import React from "react";
import { useAppContext } from "../Contexts/AppContext"; // Import useAppContext
import WidgetPane from "../components/WidgetPane";
import ActionButton from "../components/ActionButton";
import { ImagePaneProps } from "../types";

const PaletteView: React.FC = () => {
	const { activeImageUrl, activePalette, setShowModal } = useAppContext();
	const handleShowPaletteNamingModal = () => setShowModal(true);

	return (
		<>
			<div className="w-full h-full flex flex-col">
				<div className="w-full grid grid-cols-2 flex-grow">
					<ImagePane uploadedImage={activeImageUrl} />
					{activePalette?.clusterData && (
						<WidgetPane clusterData={activePalette.clusterData} />
					)}
				</div>
				<div className="flex items-center gap-2 bg-neutral-500 justify-center h-48">
					<ActionButton
						label="save palette"
						className="p-2 bg-black rounded text-white"
						onClick={handleShowPaletteNamingModal}
					/>

					{/* TODO: make the copy button functional */}
					<button className="p-2 bg-primary rounded text-white hover:bg-accent">
						Copy Palette
					</button>
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
