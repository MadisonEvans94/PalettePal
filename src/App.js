import "./App.css";
import Input from "./components/Input/Input";
import ContentSection from "./components/ContentSection/ContentSection";
import SideBar from "./components/SideBar/SideBar";
import { CanvasContext } from "./Contexts/CanvasContext";
function App() {
	return (
		<div className="App">
			<CanvasContext.Provider values={{}}>
				<SideBar>
					<Input />
				</SideBar>
				<ContentSection></ContentSection>
			</CanvasContext.Provider>
		</div>
	);
}

export default App;
