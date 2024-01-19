import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { processImage } from "./api/crud";
import ImageForm from "./components/Form";
import { useAppContext } from "./App"; // Import useAppContext

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const { imageProcessorEndpoint, setUploadedImage } = useAppContext();

	const handleSuccess = (uploadedFile: File) => {
		setUploadedImage(uploadedFile); // Update the context with the uploaded image
		navigate("/dashboard");
	};

	const [showImageForm, setShowImageForm] = useState<boolean>(false);

	const handleSubmit = async (
		event: React.FormEvent,
		imgFile: File | null,
		clusterQuantity: number,
		url: string
	) => {
		if (imgFile) {
			await processImage(event, imgFile, clusterQuantity, url);
			handleSuccess(imgFile);
		}
	};

	return (
		<div>
			<button onClick={() => setShowImageForm(true)}>click me</button>
			{showImageForm && (
				<ImageForm
					url={imageProcessorEndpoint}
					onSubmit={handleSubmit}
					onClose={() => setShowImageForm(false)}
				/>
			)}
		</div>
	);
};

export default HomePage;
