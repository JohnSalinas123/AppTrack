import { useContext } from "react";
import { AuthContextProps } from "../types/authContext";
import { AuthContext } from "../components/auth/AuthContext";

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("Unauthorized");
	}
	return context;
};
