// App.js
import React, { useState } from "react";
import "./App.css";
import ContentSection from "./components/ContentSection/ContentSection";
import Landing from "./components/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	const [centroidArray, setCentroidArray] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<Router>
			<CentroidContext.Provider value={{ centroidArray, setCentroidArray }}>
				<Routes>
					<Route
						path="/"
						element={
							<Landing
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								setPixelData={setPixelData}
								setImgFile={setImgFile}
								imgFile={imgFile}
							/>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ContentSection
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								pixelData={pixelData}
								setPixelData={setPixelData}
								imgFile={imgFile}
								setImgFile={setImgFile}
							/>
						}
					/>
				</Routes>
			</CentroidContext.Provider>
		</Router>
	);
}

export default App;
