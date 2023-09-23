import React from "react";

import Input from "../Input/Input";
import LoadingModal from "../LoadingModal";
import ppBackground from "../../assets/ppbackground.jpeg";
const Landing = ({ isLoading, setIsLoading, setPixelData, setImgFile }) => {
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
					className="text-black relative text-center z-10 flex flex-col items-center justify-center h-full px-10 w-full">
					<h1 className="mb-16 main-header">Palette Pal</h1>
					<p className="main-description mb-8 text-xs">
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					<Input
						setIsLoading={setIsLoading}
						className="input-area"
						setPixelDataForParent={setPixelData}
						setImgFile={setImgFile}
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
