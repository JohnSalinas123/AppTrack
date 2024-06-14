import { JobStatus } from "./jobStatus";

export interface UserSettingsContextProps {
	defaultJobStatus: JobStatus | null;
	fetchUserSettings: () => Promise<void>;
}
