import React, { useState } from "react";

interface ImageFormProps {
	url: string;
	onSubmit: (
		event: React.FormEvent,
		imgFile: File | null,
		clusterQuantity: number,
		url: string
	) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ url, onSubmit }) => {
	const [imgFile, setImgFile] = useState<File | null>(null);
	const [clusterQuantity, setClusterQuantity] = useState<number>(4);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImgFile(event.target.files[0]);
		}
	};

	const handleClusterQuantityChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setClusterQuantity(parseInt(event.target.value) || 3);
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100 px-4">
			<form
				className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md"
				onSubmit={(e) => onSubmit(e, imgFile, clusterQuantity, url)}
			>
				<div>
					<label
						htmlFor="fileInput"
						className="block text-lg font-medium text-gray-700"
					>
						Add Image
					</label>
					<input
						type="file"
						accept=".jpeg, .png"
						onChange={handleFileChange}
						className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                   file:border-0 file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
						id="fileInput"
					/>
				</div>
				<div>
					<label
						htmlFor="clusterQuantity"
						className="block text-lg font-medium text-gray-700"
					>
						Number of Clusters
					</label>
					<input
						type="number"
						id="clusterQuantity"
						value={clusterQuantity}
						onChange={handleClusterQuantityChange}
						min="1"
						className="w-full p-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				</div>
				<button
					type="submit"
					className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
				>
					Upload
				</button>
			</form>
		</div>
	);
};

export default ImageForm;
