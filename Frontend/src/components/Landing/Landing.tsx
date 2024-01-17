import React, { useCallback, useState } from "react";

import Input from "../Input/Input";
import LoadingModal from "../LoadingModal";
import ppBackground from "../../assets/ppbackground.jpeg";

import { LandingProps } from "../../types";

const Landing: React.FC<LandingProps> = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [imgFile, setImgFile] = useState<File | null>(null);
	// Removed setPixelData from the state as it's no longer used here directly

	const handleFileSelect = useCallback(
		(file: File) => {
			setIsLoading(true);
			setImgFile(file);
			// TODO: Trigger any additional logic needed for when a file is selected
		},
		[setIsLoading, setImgFile]
	);

	const handleError = useCallback(
		(error: Error) => {
			setIsLoading(false);
			// Handle the error, maybe show a notification to the user
			console.error(error);
		},
		[setIsLoading]
	);

	// Removed handleImageLoad callback since it's no longer being used

	return (
		<>
			<div className="w-full h-full fixed bg-[#0f0f0f]">
				{isLoading && <LoadingModal />}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: "-1",
						background:
							"linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)",
					}}
				/>
				<div
					style={{
						backgroundImage: `url(${ppBackground})`,
						backgroundSize: "cover",
					}}
					className="text-black relative text-center z-10 flex flex-col items-center justify-center h-full px-10 w-full"
				>
					<h1 className="mb-16 main-header">Palette Pal</h1>
					<p className="main-description mb-8 text-xs">
						Welcome to Palette Pal, an interactive color picker!
						Simply upload an image and receive a color palette
						suggestion based on that image!
					</p>
					<Input
						className="input-area"
						onFileSelect={handleFileSelect}
						onError={handleError}
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
