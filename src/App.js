// App.js
import React, { useState } from "react";
import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import Landing from "./components/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";

function App() {
	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	const [centroidArray, setCentroidArray] = useState(null);

	if (pixelData.length > 0) {
		return (
			<div className="App">
				<CentroidContext.Provider value={{ centroidArray, setCentroidArray }}>
					<ContentSection
						pixelData={pixelData}
						setPixelData={setPixelData}
						imgFile={imgFile}
						setImgFile={setImgFile}
					/>
				</CentroidContext.Provider>
			</div>
		);
	} else {
		return (
			<CentroidContext.Provider value={{ centroidArray, setCentroidArray }}>
				<Landing
					setPixelData={setPixelData}
					setImgFile={setImgFile}
					imgFile={imgFile}
				/>
			</CentroidContext.Provider>
		);
	}
}

export default App;
