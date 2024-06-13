import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextProps } from "../../types/authContext";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useNavigate();

	const checkAuth = async () => {
		try {
			await axios.post("/api/users/check-auth");
			console.log("User is authenticated");
			return true;
		} catch (error) {
			try {
				// Attempt to refresh accessToken
				const refreshResponse = await axios.post("/api/users/refresh");
				if (refreshResponse.status === 200) {
					return true;
				} else {
					return false;
				}
			} catch (refreshError) {
				return false;
			}
		}
	};

	const logoutUser = async () => {
		try {
			await axios.post("/api/users/logout");
			navigate("/login", { replace: true });
		} catch (error) {
			console.log("Failed to logout", error);
		}
	};

	return (
		<AuthContext.Provider value={{ checkAuth, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};
