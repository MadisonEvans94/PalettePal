import React from "react";
import videoUrl from "../../assets/paint.mp4";
import Input from "../Input/Input";

const Landing = ({ setColorsNeedUpdate, setPixelData }) => {
	return (
		<>
			<div className="text-white">
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
				{/* overlay */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background:
							"linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)",
						zIndex: "-1",
					}}
				/>

				<div className="py-auto h-screen flex flex-col justify-center items-center text-center">
					<h1 className="text-6xl font-bold mb-4">Palette Pal</h1>
					<p className="text-white text-sm mb-10">
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					<Input
						setPixelDataForParent={setPixelData}
						setColorsNeedUpdate={setColorsNeedUpdate}
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
