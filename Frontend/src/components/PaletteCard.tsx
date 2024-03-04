import React, { useState } from "react";
import { ReactComponent as RightCaret } from "../assets/icons/CaretRight.svg";
import { ReactComponent as LeftCaret } from "../assets/icons/CaretLeft.svg";
import { useAppContext } from "../Contexts/AppContext";
import { Palette } from "../types";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EditIcon } from "../assets/icons/Edit.svg";
import { ReactComponent as CopyIcon } from "../assets/icons/Copy.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/Delete.svg";

import EditPaletteNameModal from "../EditPaletteNameModal";
import ConfirmPaletteDeleteModal from "../ConfirmPaletteDeleteModal";
interface PaletteCardProps {
	palette: Palette;
}
const PaletteCard: React.FC<PaletteCardProps> = ({ palette }) => {
	const [colorCount, setColorCount] = useState<number>(2);

	const {
		setActivePalette,
		setActiveImageUrl,
		setShowModal,
		setModalContent,
	} = useAppContext();

	const navigate = useNavigate();

	const handleColorIncrement = () => {
		setColorCount((prevCount) =>
			prevCount < palette.clusterData.clusters.length - 1
				? prevCount + 1
				: prevCount
		);
	};

	const handleColorDecrement = () => {
		setColorCount((prevCount) =>
			prevCount > 0 ? prevCount - 1 : prevCount
		);
	};

	const handleDelete = () => {
		setModalContent(() => (
			<ConfirmPaletteDeleteModal paletteId={palette.id} />
		));
		setShowModal(true); // Make sure to display the modal
	};

	const handleEdit = () => {
		setModalContent(() => <EditPaletteNameModal palette_id={palette.id} />);
		setShowModal(true); // Make sure to display the modal
	};

	const openInPaletteView = () => {
		setActivePalette(palette);
		setActiveImageUrl(palette.imageUrl);
		navigate("/palette-view");
	};

	return (
		<div className=" max-w-[800px] h-fit mx-auto bg-neutral-300 rounded-lg overflow-hidden text-neutral-400 ">
			<div className="flex">
				<div className="w-80 h-80 bg-neutral-400 flex items-center justify-center">
					{palette.imageUrl && (
						<img
							className="object-cover w-full h-full"
							src={palette.imageUrl}
							alt="sample"
						/>
					)}
				</div>
				<div className="w-2/3 bg-white p-4 flex flex-col justify-between">
					<div className="flex justify-between items-center space-x-2">
						<h2 className="text-2xl font-bold">{palette.name}</h2>
						<div className="flex space-x-3">
							<DeleteIcon
								className="w-4 h-4 cursor-pointer hover:text-accent hover:transition"
								onClick={handleDelete}
							>
								Delete
							</DeleteIcon>

							<CopyIcon className="w-4 h-4 cursor-pointer hover:text-accent hover:transition">
								Copy Palette
							</CopyIcon>
							<EditIcon
								onClick={handleEdit}
								className="w-4 h-4 cursor-pointer hover:text-accent hover:transition"
							>
								Edit Palette
							</EditIcon>
						</div>
					</div>

					<div className="flex items-center justify-between my-6">
						<LeftCaret
							className="w-4 cursor-pointer hover:text-accent hover:transition"
							onClick={handleColorDecrement}
						/>
						<div className="flex space-x-2">
							{palette.clusterData.clusters[colorCount].map(
								(color) => {
									return (
										<div
											key={color}
											style={{ backgroundColor: color }}
											className="w-6 h-6 rounded-full"
										/>
									);
								}
							)}
						</div>
						<RightCaret
							className="w-4 cursor-pointer hover:text-accent hover:transition"
							onClick={handleColorIncrement}
						/>
					</div>

					<button
						onClick={openInPaletteView}
						className="px-3 py-1 border border-neutral-400 text-neutral-400 rounded self-center hover:border-accent hover:bg-accent hover:text-white hover:transition"
					>
						Open In Palette View
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaletteCard;
