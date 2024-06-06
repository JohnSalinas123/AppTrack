export interface AuthContextProps {
	checkAuth: () => Promise<boolean>;
	loginUser: (email: string, password: string) => void;
	logoutUser: () => void;
}
