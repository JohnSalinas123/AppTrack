import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ApplicationPage } from "./pages/ApplicationPage";
import { LayoutPage } from "./pages/LayoutPage";
import { LoginPage } from "./pages/LoginPage";
import { useState } from "react";
import { NoPage } from "./pages/NoPage";

function App() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<Navigate replace to="/applications" />} />
				<Route
					path="/applications"
					element={
						isLoggedIn ? <LayoutPage /> : <Navigate replace to="/login" />
					}
				>
					<Route index element={<ApplicationPage />} />
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>
		</>
	);
}

export default App;
