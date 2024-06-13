import { createContext, useEffect, useState } from "react";
import { JobStatus } from "../types/jobStatus";
import axios from "axios";
import { UserSettingsContextProps } from "../types/userSettingsContext";

export const UserSettingsContext = createContext<
	UserSettingsContextProps | undefined
>(undefined);

export const UserSettingProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [defaultJobStatus, setDefaultJobStatus] = useState<JobStatus | null>(
		null
	);

	useEffect(() => {
		fetchUserSettings();
	}, []);

	// fetch user settings
	const fetchUserSettings = async () => {
		try {
			const response = await axios.get("/api/users/settings");
			console.log(response.data);
			const { defaultStatus } = response.data;
			console.log(defaultStatus);
			setDefaultJobStatus(defaultStatus);
		} catch (error) {
			console.log(error);
			console.log("Failed to fetch user settings");
		}
	};

	return (
		<UserSettingsContext.Provider
			value={{ defaultJobStatus, fetchUserSettings }}
		>
			{children}
		</UserSettingsContext.Provider>
	);
};
