import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import SideBar from "./components/SideBar/SideBar";
import { CanvasContext } from "./Contexts/CanvasContext";
function App() {
	return (
		<div className="App">
			<SideBar></SideBar>
			<ContentSection></ContentSection>
		</div>
	);
}

export default App;
