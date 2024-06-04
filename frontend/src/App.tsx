import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ApplicationPage } from "./pages/ApplicationPage";
import { LayoutPage } from "./pages/LayoutPage";
import { LoginPage } from "./pages/LoginPage";
import { NoPage } from "./pages/NoPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<Navigate replace to="/applications" />} />
				<Route
					path="/applications"
					element={
						<ProtectedRoute>
							<LayoutPage />
						</ProtectedRoute>
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
