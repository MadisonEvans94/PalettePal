import React, { useState, useRef } from "react";
import { ImageFormProps } from "../types";
// TODO: need a loading modal
// TODO: invoke a max image size restraint
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
		<form
			onSubmit={handleSubmit}
			className="rounded-lg flex flex-col gap-1 py-10 px-12 w-80"
		>
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
				className="border border-white cursor-pointer text-sm py-2 px-4  font-semibold text-white hover:bg-theme1 hover:border-theme1 hover:text-white transition rounded"
			>
				Choose Image
			</button>
			{imgFile && (
				<span className="text-sm text-white mx-auto font-semibold">
					{imgFile.name}
				</span>
			)}

			<button
				disabled={!imgFile}
				type="submit"
				className={`w-full px-4 py-2 text-white rounded ${
					imgFile
						? "border border-white bg-dark hover:border-theme1 hover:bg-theme1"
						: "bg-dim text-faint border-dim"
				}`}
			>
				Upload
			</button>
		</form>
	);
};

export default ImageUploadForm;
