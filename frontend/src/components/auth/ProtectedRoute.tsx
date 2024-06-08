import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { checkAuth } = useAuth();

	useEffect(() => {
		const checkIfAuthenticated = async () => {
			const authState = await checkAuth();
			setIsAuthenticated(authState);
			setIsLoading(false);
		};
		checkIfAuthenticated();
	}, [checkAuth]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
