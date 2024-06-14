import { useContext } from "react";
import { UserSettingsContext } from "../components/UserSettingsContext";

export const useUserSettings = () => {
	const context = useContext(UserSettingsContext);
	if (!context) {
		throw new Error("Correct context missing");
	}
	return context;
};
