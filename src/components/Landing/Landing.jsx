import React from "react";
import videoUrl from "../../assets/paint-modified.mp4";
import Input from "../Input/Input";

const Landing = ({ setColorsNeedUpdate, setPixelData, setImgFile }) => {
	return (
		<>
			<div className="w-full h-full fixed">
				<video
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
						objectFit: "cover",
						zIndex: "-10",
					}}
					autoPlay
					loop
					muted>
					<source src={videoUrl} type="video/mp4" />
				</video>
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

				<div className="text-white text-center z-10 flex flex-col items-center justify-center h-full px-10 w-full">
					<h1 className="mb-16 main-header">Palette Pal</h1>
					<p className="main-description mb-8 text-xs">
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					<Input
						className="input-area"
						setPixelDataForParent={setPixelData}
						setColorsNeedUpdate={setColorsNeedUpdate}
						setImgFile={setImgFile}
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
