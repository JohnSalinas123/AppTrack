import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axios.post("/api/users/check-auth");
				setIsAuthenticated(true);
			} catch (error) {
				try {
					// Attempt to refresh accessToken
					const refreshResponse = await axios.post("/api/users/refresh");
					if (refreshResponse.status === 200) {
						setIsAuthenticated(true);
					} else {
						setIsAuthenticated(false);
					}
				} catch (refreshError) {
					setIsAuthenticated(false);
				}
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? children : <Navigate to="/login" />;
};
