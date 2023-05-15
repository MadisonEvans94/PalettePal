import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { motion, AnimatePresence } from "framer-motion";
const Palette = ({ clusterQty }) => {
	const { centroidArray } = useContext(CentroidContext);
	const [copiedColor, setCopiedColor] = useState(null);
	console.log(centroidArray, "CENTROID ARRAY");
	const testColors = ["#F0F", "#F00", "#0F0", "#000"];

	const copyToClipboard = (color) => {
		navigator.clipboard.writeText(color);
		setCopiedColor(color);

		// Remove the notification after 3 seconds
		setTimeout(() => {
			setCopiedColor(null);
		}, 1000);
	};

	const colorList = centroidArray.colors[clusterQty - 1].map((color, index) => (
		<div
			key={index}
			onClick={() => copyToClipboard(color)}
			className="cursor-pointer my-10 relative group h-48 w-48 border md:mx-2 rounded-full flex-none"
			style={{
				background: `${color}`,
			}}>
			<p className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-200">
				{color}
			</p>

			<AnimatePresence mode="wait">
				{copiedColor === color && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,

							transition: { type: "spring" },
						}}
						exit={{ opacity: 0 }}
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black p-2 rounded text-xs">
						Color copied to clipboard!
					</motion.p>
				)}
			</AnimatePresence>
		</div>
	));

	return (
		<>
			<div className="border w-screen overflow-x-auto h-fit flex flex-row justify-start">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
