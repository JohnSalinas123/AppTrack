interface JobStatus {
	name: string;
	_id: number;
}

export interface JobApplication {
	_id: number;
	jobTitle: string;
	companyName: string;
	applicationDate: Date;
	jobDescription: string;
	statuses: JobStatus[];
}
