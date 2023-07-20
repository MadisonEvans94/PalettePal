import React from "react"; // Import useContext
import Input from "../../components/Input/Input";
import ppBackground from "../../assets/PP-background.jpeg";

const Landing = () => {
	return (
		<>
			<div className="fixed w-full h-full">
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: "-1",
					}}
				/>

				<div
					style={{
						backgroundImage: `url(${ppBackground})`,
						backgroundSize: "cover",
					}}
					className="relative z-10 flex flex-col items-center justify-center w-full h-full px-10 text-center text-black bg-info"
				>
					<h1
						className="mb-16 main-header text-info"
						// style={{ textShadow: "10px 12px 3px rgba(0,0,0,0.6)" }}
					>
						Palette Pal
					</h1>
					<p className="mb-8 text-xs main-description text-info">
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					<Input
						className="input-area"
						styleProp="rounded border bg-transparent border-info cursor-pointer p-2 text-info hover:text-secondary hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition"
						buttonText="Select Image"
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
