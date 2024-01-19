// App.tsx
import { useState } from "react";
import { processImage } from "./api/crud";
import "./App.css";
import ImageForm from "./components/Form";
const apiUrl = process.env.REACT_APP_API_URL || "";

function App() {
	const [showImageForm, setShowImageForm] = useState<boolean>(false);
	return (
		<>
			<button onClick={() => setShowImageForm(true)}>click me</button>
			{showImageForm && (
				<ImageForm
					url={apiUrl}
					onSubmit={processImage}
					onClose={() => setShowImageForm(false)}
				/>
			)}
		</>
	);
}

export default App;
