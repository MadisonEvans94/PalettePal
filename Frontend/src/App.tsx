// App.tsx
import { useState } from "react";
import "./App.css";
import ContentSection from "./components/ContentSection/ContentSection";
import Landing from "./components/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PixelData, ImageFile, CentroidContextType } from "./types";

function App() {
	const [centroidArray, setCentroidArray] = useState<any[]>([]); //FIXME: Use a more specific type if possible
	const [isLoading, setIsLoading] = useState(false);
	const [pixelData, setPixelData] = useState<PixelData>([]);
	const [imgFile, setImgFile] = useState<ImageFile | null>(null);

	const contextValue: CentroidContextType = {
		centroidArray,
		setCentroidArray,
	};

	return (
		<Router>
			<CentroidContext.Provider value={contextValue}>
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
