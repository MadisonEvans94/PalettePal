import React from "react";
import videoUrl from "../../assets/paint.mp4";
import Input from "../Input/Input";

const Landing = ({ setColorsNeedUpdate, setPixelData }) => {
	return (
		<>
			<div className="sidebar-container ">
				<video
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
						objectFit: "cover",
						zIndex: "-1",
					}}
					autoPlay
					loop
					muted>
					<source src={videoUrl} type="video/mp4" />
				</video>
				{/* <div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background:
							"linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)",
					}}
				/> */}

				<div className="z-10">
					<h1 className="main-title">Palette Pal</h1>
					<p className="main-description">
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					<Input
						className="input-area"
						setPixelDataForParent={setPixelData}
						setColorsNeedUpdate={setColorsNeedUpdate}
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
