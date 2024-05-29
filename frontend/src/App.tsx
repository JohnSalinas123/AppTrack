import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApplicationPage } from "./pages/ApplicationPage";
import { LayoutPage } from "./pages/LayoutPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LayoutPage />}>
						<Route index element={<ApplicationPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
