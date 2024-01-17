// Input.tsx
import React, { ChangeEvent } from "react";

interface InputProps {
	onFileSelect: (file: File) => void; // Callback invoked with the selected file
	onError: (error: Error) => void; // Callback invoked on error
	className: string;
}

const Input: React.FC<InputProps> = ({ onFileSelect, onError, className }) => {
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			try {
				onFileSelect(file); // Invoke the callback for file change
			} catch (error) {
				if (error instanceof Error) {
					onError(error);
				}
			}
		}
	};

	return (
		<div className={className}>
			<input
				className="hidden"
				type="file"
				id="image-input"
				accept="image/jpeg, image/png, image/webp"
				onChange={handleFileChange}
			/>
			<label
				htmlFor="image-input"
				className="border p-4 rounded-md cursor-pointer text-white hover:bg-white hover:text-[#0f0f0f] transition"
			>
				Select file
			</label>
		</div>
	);
};

export default Input;
