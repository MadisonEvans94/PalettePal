import React, { useState } from "react";

interface ImageFormProps {
	url: string;
	onSubmit: (
		event: React.FormEvent,
		imgFile: File | null,
		clusterQuantity: number,
		url: string
	) => void;
	onClose: () => void; // Add this line
	onSuccess?: () => void; // Optional onSuccess callback
}

const ImageForm: React.FC<ImageFormProps> = ({
	url,
	onSubmit,
	onClose,
	onSuccess,
}) => {
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await onSubmit(e, imgFile, clusterQuantity, url);
			if (onSuccess) {
				onSuccess(); // Call onSuccess if defined
			}
		} catch (error) {
			console.error("Error during form submission:", error);
		}
	};

	return (
		<form
			className="relative w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md"
			onSubmit={handleSubmit}
		>
			<div>
				<label
					htmlFor="fileInput"
					className="block text-lg font-medium text-info"
				>
					Add Image
				</label>
				<input
					type="file"
					accept=".jpeg, .png"
					onChange={handleFileChange}
					className="file:cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                   file:border-0 file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-info hover:file:bg-neutral-200 file:rounded"
					id="fileInput"
				/>
			</div>

			<button
				type="submit"
				className="w-full px-4 py-2 text-white bg-primary rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
			>
				Upload
			</button>
			<button
				type="button" // Make sure this is a button of type 'button'
				className="absolute z-50 top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
				onClick={onClose}
			>
				close
			</button>
		</form>
	);
};

export default ImageForm;
