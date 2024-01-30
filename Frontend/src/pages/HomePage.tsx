import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { processImage } from "../api/apiFunctions";
import ImageForm from "../components/ImageUploadForm";
import { useAppContext } from "../Contexts/AppContext";

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const { imageProcessorEndpoint, setActiveImageUrl, setActivePalette } =
		useAppContext();

	const handleSuccess = (uploadedFile: File) => {
		const activeImageUrl = URL.createObjectURL(uploadedFile);

		setActiveImageUrl(activeImageUrl);
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
				setActivePalette({
					name: `Image - ${new Date().toISOString()}`,
					date: new Date().toISOString().slice(0, 10),
					id: null,
					clusterData: clusterData,
					imageUrl: "",
				});
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
					className="border p-2 rounded text-neutral-400 border-neutral-400 hover:border-accent hover:bg-accent hover:text-white transition"
					onClick={() => setShowImageForm(true)}
				>
					Create A New Palette
				</button>
			)}
		</div>
	);
};

export default HomePage;
