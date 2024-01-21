import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { processImage } from "./api/crud";
import ImageForm from "./components/ImageUploadForm";
import { useAppContext } from "./AppContext"; // Import useAppContext
import { useAuth } from "./useAuth";

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const { imageProcessorEndpoint, setUploadedImage, setClusterData } =
		useAppContext();

	const handleSuccess = (uploadedFile: File) => {
		setUploadedImage(uploadedFile);
		navigate("/palette-view");
	};

	const [showImageForm, setShowImageForm] = useState<boolean>(false);
	const handleSubmit = async (
		event: React.FormEvent,
		imgFile: File | null,

		url: string
	) => {
		if (imgFile) {
			const clusterData = await processImage(event, imgFile, url);
			if (clusterData) {
				setClusterData(clusterData);
			}
			handleSuccess(imgFile);
		}
	};

	return (
		<div className="bg-neutral-100 h-full flex items-center justify-center">
			{showImageForm ? (
				<ImageForm
					url={imageProcessorEndpoint}
					onSubmit={handleSubmit}
					onClose={() => setShowImageForm(false)}
				/>
			) : (
				<button
					className="border p-2 rounded bg-neutral-200"
					onClick={() => setShowImageForm(true)}
				>
					Create A New Palette
				</button>
			)}
		</div>
	);
};

export default HomePage;
