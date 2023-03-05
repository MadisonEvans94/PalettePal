import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import SideBar from "./components/SideBar/SideBar";
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
				<SideBar
					setColorsNeedUpdate={setColorsNeedUpdate}
					setPixelData={setPixelData}
				/>
			</>
		);
	}
}

export default App;
