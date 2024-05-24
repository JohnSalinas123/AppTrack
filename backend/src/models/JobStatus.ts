import mongoose, {Document, Schema} from 'mongoose';

export interface IJobStatus extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
}

const JobStatusSchema: Schema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true},
});

export default mongoose.model<IJobStatus>('JobStatus', JobStatusSchema)