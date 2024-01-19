import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { processImage } from "./api/crud";
import "./App.css";
import ImageForm from "./components/Form";

const apiUrl = process.env.REACT_APP_API_URL || "";

function App() {
	return (
		<Router>
			<div>
				<nav>
					<Link to="/">Home</Link> |{" "}
					<Link to="/dashboard">Dashboard</Link>
				</nav>

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dashboard" element={<div>dashboard</div>} />
				</Routes>
			</div>
		</Router>
	);
}

function HomePage() {
	const [showImageForm, setShowImageForm] = useState<boolean>(false);
	return (
		<div>
			<div>
				<button onClick={() => setShowImageForm(true)}>click me</button>
				{showImageForm && (
					<ImageForm
						url={apiUrl}
						onSubmit={processImage}
						onClose={() => setShowImageForm(false)}
					/>
				)}
			</div>
		</div>
	);
}

function ImageFormPage() {
	return <></>;
}

export default App;
