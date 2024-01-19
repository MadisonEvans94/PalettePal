import React, { useState } from "react";

interface FormProps {
	url: string;
	onSubmit: (
		event: React.FormEvent,
		imgFile: File | null,
		clusterQuantity: number,
		url: string
	) => void;
}

const Form: React.FC<FormProps> = ({ url, onSubmit }) => {
	const [imgFile, setImgFile] = useState<File | null>(null);
	const [clusterQuantity, setClusterQuantity] = useState<number>(4);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImgFile(event.target.files[0]);
		}
	};

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<form onSubmit={(e) => onSubmit(e, imgFile, clusterQuantity, url)}>
				<input
					type="file"
					accept=".jpeg, .png"
					onChange={handleFileChange}
					style={{ display: "none" }}
					id="fileInput"
				/>
				<label
					htmlFor="fileInput"
					className="bg-gray-600 text-white border-2 border-gray-800 p-4 rounded-lg cursor-pointer"
				>
					Add Image
				</label>
				<input
					type="number"
					value={clusterQuantity}
					onChange={(e) =>
						setClusterQuantity(parseInt(e.target.value))
					}
					min="1"
					className="ml-4"
				/>
				<button
					type="submit"
					className="ml-4 bg-blue-500 text-white border-2 border-blue-700 p-2 rounded-lg"
				>
					Upload
				</button>
			</form>
		</div>
	);
};

export default Form;
