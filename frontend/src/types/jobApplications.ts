interface JobStatus {
	statusName: string;
	statusID: number;
}

export interface JobApplication {
	jobTitle: string;
	companyName: string;
	dateApplied: Date;
	jobDescription: string;
	statuses: JobStatus[];
}
