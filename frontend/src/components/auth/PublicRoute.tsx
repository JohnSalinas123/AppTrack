import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
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

	return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
