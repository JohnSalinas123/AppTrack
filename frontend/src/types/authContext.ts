export interface AuthContextProps {
	checkAuth: () => Promise<boolean>;
	logoutUser: () => void;
}
