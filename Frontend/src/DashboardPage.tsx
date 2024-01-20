import React from "react";
import { useAppContext } from "./App"; // Import useAppContext
import WidgetPane from "./WidgetPane";
import ActionButton from "./ActionButton";

// TODO: DahsboardPage should load in the current palette image from context

const DashboardPage: React.FC = () => {
	const { uploadedImage, clusterData } = useAppContext();

	return (
		<>
			<div className="w-full h-full bg-gray-400 flex flex-col">
				<div className="w-full grid grid-cols-2 flex-grow">
					<ImagePane uploadedImage={uploadedImage} />
					{clusterData && <WidgetPane clusterData={clusterData} />}
				</div>
				<div className="flex items-center gap-2 justify-center h-48">
					<ActionButton
						label="save palette"
						className="p-2 bg-black rounded text-white"
						onClick={() => console.log("palette saved")}
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

export default DashboardPage;

interface ImagePaneProps {
	uploadedImage: File | null;
}
const ImagePane: React.FC<ImagePaneProps> = ({ uploadedImage }) => {
	return (
		<div className="bg-gray-600 text-white h-full overflow-hidden relative flex justify-center items-center">
			{uploadedImage && (
				<img
					// TODO: Use IndexDB localforage to cache image
					src={URL.createObjectURL(uploadedImage)}
					alt="Uploaded"
					className="absolute w-full h-full object-cover"
				/>
			)}
		</div>
	);
};
