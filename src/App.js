import "./App.css";
import Input from "./components/Input/Input";
import ContentSection from "./components/ContentSection/ContentSection";
import SideBar from "./components/SideBar/SideBar";
function App() {
	return (
		<div className="App">
			<SideBar>
				<Input />
			</SideBar>
			<ContentSection></ContentSection>
		</div>
	);
}

export default App;
