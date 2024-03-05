import React, { useState, useRef } from "react";
import { ImageFormProps } from "../types";

const ImageUploadForm: React.FC<ImageFormProps> = ({
	url,
	onSubmit,
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
		<form onSubmit={handleSubmit} className="flex flex-col gap-1 mx-2 w-60">
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
				className="cursor-pointer text-sm py-2 px-4 border font-semibold border-dark text-dark hover:bg-dark hover:text-white transition rounded"
			>
				Choose Image
			</button>
			{imgFile && (
				<span className="text-sm font-semibold">{imgFile.name}</span>
			)}

			<button
				disabled={!imgFile}
				type="submit"
				className={`w-full px-4 py-2 text-white rounded ${
					imgFile ? "bg-theme1 hover:bg-accent" : "bg-gray-400"
				}`}
			>
				Upload
			</button>
		</form>
	);
};

export default ImageUploadForm;
