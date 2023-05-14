import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import Landing from "./components/Landing/Landing";

import { useState } from "react";
function App() {
	const [colorsNeedUpdate, setColorsNeedUpdate] = useState(false);
	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	if (pixelData.length > 0) {
		return (
			<div className="App">
				<ContentSection
					pixelData={pixelData}
					setPixelData={setPixelData}
					colorsNeedUpdate={colorsNeedUpdate}
					setColorsNeedUpdate={setColorsNeedUpdate}
					imgFile={imgFile}
					setImgFile={setImgFile}
				/>
			</div>
		);
	} else {
		return (
			<>
				<Landing
					setColorsNeedUpdate={setColorsNeedUpdate}
					setPixelData={setPixelData}
					setImgFile={setImgFile}
					imgFile={imgFile}
				/>
			</>
		);
	}
}

export default App;
