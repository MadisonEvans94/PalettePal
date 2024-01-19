import React from "react";
import { useAppContext } from "./App"; // Import useAppContext

// TODO: DahsboardPage should load in the current palette image from context
const DashboardPage: React.FC = () => {
	const { uploadedImage } = useAppContext();

	return (
		<>
			<div className="w-full h-full bg-gray-400 flex flex-col">
				<div className="w-full grid grid-cols-2 flex-grow">
					<div className="bg-gray-600 text-white h-full overflow-hidden relative flex justify-center items-center">
						{uploadedImage && (
							<img
								src={URL.createObjectURL(uploadedImage)}
								alt="Uploaded"
								className="absolute w-full h-full object-cover" // Tailwind CSS classes for full width,
							/>
						)}
					</div>
					<div className="bg-gray-800 text-white h-full">
						widget pane
					</div>
				</div>
				<div className="flex items-center justify-center h-48">
					<button className="p-2 bg-black rounded text-white">
						save palette
					</button>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
