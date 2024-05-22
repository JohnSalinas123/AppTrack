import mongoose, {Document, Schema, StringExpressionOperatorReturningBoolean} from "mongoose";

export interface IJobApplication extends Document {
    user: mongoose.Schema.Types.ObjectId;
    companyName: string;
    jobTitle: string;
    applicationDate: Date;
    jobDescription: string;
    statuses: mongoose.Types.ObjectId[];
}

const JobApplicationSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    companyName: {type: String, required: true },
    jobTitle: {type: String, required: true },
    applicationDate: {type: Date, required: true},
    jobDescription: {type: String, required: true},
    statuses: [{type: mongoose.Schema.Types.ObjectId}]

})

export default mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);