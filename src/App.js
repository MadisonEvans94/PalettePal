import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import SideBar from "./components/SideBar/SideBar";
import { useState } from "react";
function App() {
	const [pixelData, setPixelData] = useState([]);
	if (pixelData.length > 0) {
		return (
			<div className="App">
				<ContentSection pixelData={pixelData} setPixelData={setPixelData} />
			</div>
		);
	} else {
		return (
			<>
				<div>asdf</div>
			</>
		);
	}
}

export default App;
