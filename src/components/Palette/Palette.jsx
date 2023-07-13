import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { motion, AnimatePresence } from "framer-motion";
const Palette = ({ clusterQty }) => {
	const { centroidArray } = useContext(CentroidContext);
	console.log(centroidArray, "CENTROID ARRAY");
	const [copiedColor, setCopiedColor] = useState(null);

	const copyToClipboard = (color) => {
		navigator.clipboard.writeText(color);
		setCopiedColor(color);

		// Remove the notification after 3 seconds
		setTimeout(() => {
			setCopiedColor(null);
		}, 1000);
	};
	let colorList;
	if (centroidArray && centroidArray[clusterQty - 1]) {
		colorList = centroidArray[clusterQty - 1].map((color, index) => (
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
				className="cursor-pointer my-8 mx-2 relative group h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 md:mx-2 rounded-full flex-none border border-white"
				style={{
					background: `${color}`,
				}}>
				<p className="-z-10 absolute text-white left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-200 text-xs">
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
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-[#2d2d2d] text-center p-2 rounded text-[8px] lg:text-[12px] w-full">
							Color copied to clipboard!
						</motion.p>
					)}
				</AnimatePresence>
			</motion.div>
		));
	}
	return (
		<>
			<div className="bg-transparent h-fit w-full overflow-x-auto flex flex-row justify-start lg:justify-center bg-[#2d2d2d]">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
