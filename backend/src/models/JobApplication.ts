import mongoose, {
	Document,
	Schema,
	StringExpressionOperatorReturningBoolean,
} from "mongoose";

export interface IJobApplication extends Document {
	user: mongoose.Schema.Types.ObjectId;
	company: string;
	title: string;
	appliedDate: Date;
	notes: string;
	statusIds: mongoose.Types.ObjectId[];
}

const JobApplicationSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	company: { type: String, required: true },
	title: { type: String, required: true },
	appliedDate: { type: Date, required: true },
	notes: { type: String, required: false },
	statusIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobStatus" }],
});

export default mongoose.model<IJobApplication>(
	"JobApplication",
	JobApplicationSchema
);
