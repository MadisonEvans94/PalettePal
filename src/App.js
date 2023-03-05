import "./App.css";

import ContentSection from "./components/ContentSection/ContentSection";
import SideBar from "./components/SideBar/SideBar";

function App() {
	return (
		<div className="App">
			<SideBar />
			<ContentSection />
		</div>
	);
}

export default App;
