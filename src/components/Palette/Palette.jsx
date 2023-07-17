import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { motion, AnimatePresence } from "framer-motion";
const Palette = ({ clusterQty }) => {
	const { centroidArray } = useContext(CentroidContext);
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
				className="relative flex-none w-8 h-8 mx-2 my-1 border rounded-full cursor-pointer border-info group md:h-24 md:w-24 lg:h-24 lg:w-24 md:mx-2"
				style={{
					background: `${color}`,
				}}
			>
				<p className="absolute text-xs text-primary transition-all duration-200 transform -translate-x-1/2 opacity-0 -z-10 left-1/2 group-hover:opacity-100 group-hover:-translate-y-[24px]">
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
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary bg-info text-center p-2 rounded text-[8px] lg:text-[12px] w-full"
						>
							Color copied to clipboard!
						</motion.p>
					)}
				</AnimatePresence>
			</motion.div>
		));
	}
	return (
		<>
			<div className="flex flex-row justify-center w-full overflow-x-auto bg-transparent h-fit bg-info">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
