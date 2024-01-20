import React, { useState, useRef } from "react";
import { ReactComponent as Close } from "../assets/svg/Close.svg";

interface ImageFormProps {
	url: string;
	onSubmit: (
		event: React.FormEvent,
		imgFile: File | null,
		url: string
	) => void;
	onClose: () => void;
	onSuccess?: () => void;
}

const ImageUploadForm: React.FC<ImageFormProps> = ({
	url,
	onSubmit,
	onClose,
	onSuccess,
}) => {
	const [imgFile, setImgFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImgFile(event.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await onSubmit(e, imgFile, url);
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			console.error("Error during form submission:", error);
		}
	};

	const handleFileInputClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<form
			className="relative w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md"
			onSubmit={handleSubmit}
		>
			<div className="flex items-center space-x-4">
				<input
					type="file"
					accept=".jpeg, .png"
					onChange={handleFileChange}
					className="hidden"
					ref={fileInputRef}
					id="fileInput"
				/>
				<button
					type="button"
					onClick={handleFileInputClick}
					className="cursor-pointer text-sm py-2 px-4 border-0 font-semibold bg-blue-50 text-info hover:bg-neutral-200 rounded"
				>
					Choose Image
				</button>
				{imgFile && (
					<span className="text-sm font-semibold">
						{imgFile.name}
					</span>
				)}
			</div>

			<button
				type="submit"
				className="w-full px-4 py-2 text-white bg-primary rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
			>
				Upload
			</button>
			<button
				type="button"
				className="absolute z-50 top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
				onClick={onClose}
			>
				<Close />
			</button>
		</form>
	);
};

export default ImageUploadForm;
