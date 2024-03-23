import React from "react";
import { ImagePaneProps } from "../../types";
import { IoImage } from "react-icons/io5";
const ImagePane: React.FC<ImagePaneProps> = ({ uploadedImage, className }) => {
	return (
		<>
			<div className={`text-white h-full flex items-center ${className}`}>
				<div className="overflow-hidden relative w-full h-full">
					{uploadedImage ? (
						<img
							src={uploadedImage}
							alt="Uploaded"
							className="absolute w-full h-full object-contain "
						/>
					) : (
						<div className=" text-dark  h-full w-full flex flex-col items-center justify-center">
							<IoImage size="8em" />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ImagePane;
