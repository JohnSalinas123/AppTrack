import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ApplicationPage } from "./pages/ApplicationPage";
import { LayoutPage } from "./pages/LayoutPage";
import { LoginPage } from "./pages/LoginPage";
import { NoPage } from "./pages/NoPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthContext";
import { PublicRoute } from "./components/auth/PublicRoute";
import { UserSettingProvider } from "./components/UserSettingsContext";

function App() {
	return (
		<>
			<AuthProvider>
				<UserSettingProvider>
					<Routes>
						<Route element={<PublicRoute />}>
							<Route path="/login" element={<LoginPage />} />
						</Route>

						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/" element={<Navigate replace to="/dashboard" />} />
							<Route path="dashboard" element={<LayoutPage />}>
								<Route index element={<Navigate to="applications" />} />
								<Route path="applications" element={<ApplicationPage />} />
							</Route>
						</Route>

						<Route path="*" element={<NoPage />} />
					</Routes>
				</UserSettingProvider>
			</AuthProvider>
		</>
	);
}

export default App;
