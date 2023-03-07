import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import Landing from "./components/Landing/Landing";
import ContentLayout from "./components/ContentSection/ContentLayout";
import { useState } from "react";
function App() {
	const [colorsNeedUpdate, setColorsNeedUpdate] = useState(false);
	const [pixelData, setPixelData] = useState([]);
	if (pixelData.length > 0) {
		return (
			<div className="App">
				<ContentSection
					pixelData={pixelData}
					setPixelData={setPixelData}
					colorsNeedUpdate={colorsNeedUpdate}
					setColorsNeedUpdate={setColorsNeedUpdate}
				/>
			</div>
		);
	} else {
		return (
			<>
				<Landing
					setColorsNeedUpdate={setColorsNeedUpdate}
					setPixelData={setPixelData}
				/>
			</>
		);
	}
}

export default App;
