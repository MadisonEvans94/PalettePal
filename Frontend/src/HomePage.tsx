import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { processImage } from "./api/crud";
import ImageForm from "./components/Form";
import { useAppContext } from "./App"; // Import useAppContext

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const { imageProcessorEndpoint } = useAppContext();
	const handleSuccess = () => {
		navigate("/dashboard");
	};

	const [showImageForm, setShowImageForm] = useState<boolean>(false);
	return (
		<div>
			<div>
				<button onClick={() => setShowImageForm(true)}>click me</button>
				{showImageForm && (
					<ImageForm
						url={imageProcessorEndpoint}
						onSubmit={processImage}
						onClose={() => setShowImageForm(false)}
						onSuccess={handleSuccess}
					/>
				)}
			</div>
		</div>
	);
};

export default HomePage;
