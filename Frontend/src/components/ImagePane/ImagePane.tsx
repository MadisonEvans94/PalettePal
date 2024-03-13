import React from "react";
import { ImagePaneProps } from "../../types";

const ImagePane: React.FC<ImagePaneProps> = ({ uploadedImage }) => {
	return (
		<div className="text-white h-full flex items-center p-12">
			<div className="overflow-hidden relative w-full h-full ">
				{uploadedImage && (
					<img
						src={uploadedImage}
						alt="Uploaded"
						className="absolute w-full h-full object-contain"
					/>
				)}
			</div>
		</div>
	);
};

export default ImagePane;
