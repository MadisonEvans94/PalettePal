// App.tsx
import { useState } from "react";
import "./App.css";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [imgFile, setImgFile] = useState<File | null>(null);
	const [clusterQuantity, setClusterQuantity] = useState<number>(4); // Default to 4 clusters

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImgFile(event.target.files[0]);
		}
	};

	const handleTestGetRequest = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				"http://localhost:8000/image-processor/"
			);
			if (!response.ok) {
				throw new Error("GET request failed");
			}
			const result = await response.json();
			console.log("GET request successful", result);
		} catch (error) {
			console.error("Error during GET request:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!imgFile) {
			alert("Please select an image first.");
			return;
		}

		setIsLoading(true);
		const formData = new FormData();
		formData.append("image", imgFile);
		formData.append("clusterQuantity", clusterQuantity.toString());

		try {
			const response = await fetch("http://localhost:8000/images/", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Image upload failed");
			}

			const result = await response.json();
			console.log("Upload successful", result);
		} catch (error) {
			console.error("Error during upload:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="w-full h-screen flex items-center justify-center">
				<form onSubmit={handleSubmit}>
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
						type="button"
						className="ml-4 bg-green-500 text-white border-2 border-green-700 p-2 rounded-lg"
						onClick={handleTestGetRequest}
					>
						Test GET Request
					</button>
					<button
						type="submit"
						className="ml-4 bg-blue-500 text-white border-2 border-blue-700 p-2 rounded-lg"
					>
						Upload
					</button>
				</form>
				{isLoading && <p>Loading...</p>}
			</div>
		</>
	);
}

export default App;
