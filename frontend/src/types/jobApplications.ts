interface JobStatus {
	name: string;
	_id: number;
}

export interface JobApplication {
	_id: number;
	title: string;
	company: string;
	appliedDate: Date;
	notes: string;
	statusIds: JobStatus[];
}
