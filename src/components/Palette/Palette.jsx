import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { motion, AnimatePresence } from "framer-motion";
const Palette = ({ clusterQty }) => {
	const { centroidArray } = useContext(CentroidContext);
	const [copiedColor, setCopiedColor] = useState(null);
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
		<motion.div
			layout
			initial={{ scale: 1, opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.25 } }}
			exit={{ opacity: 0 }}
			whileHover={{
				scale: 1.05,
				transition: { duration: 0.2 },
			}}
			whileTap={{ scale: 0.9, transition: { type: "spring" } }}
			key={index}
			onClick={() => copyToClipboard(color)}
			className="cursor-pointer my-10 relative group h-48 w-48 md:mx-2 rounded-full flex-none border border-white"
			style={{
				background: `${color}`,
			}}>
			<p className="-z-10 absolute text-white left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-200">
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
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-[#2d2d2d] p-2 rounded text-xs">
						Color copied to clipboard!
					</motion.p>
				)}
			</AnimatePresence>
		</motion.div>
	));

	return (
		<>
			<div className="border-t border-b w-screen overflow-x-auto h-fit flex flex-row justify-start lg:justify-center bg-[#2d2d2d]">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
