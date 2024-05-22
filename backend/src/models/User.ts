import mongoose, {Document, Schema} from 'mongoose';

export interface IJobStatus {
    _id: mongoose.Types.ObjectId;
    name: string;
}

export interface IUser extends Document {
    email: string;
    password: string;
    jobStatuses: IJobStatus[]
}

const JobStatusSchema: Schema = new Schema({
    name: { type: String, required: true},
});

const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    jobStatuses: {type: [JobStatusSchema], default: []}
});

export default mongoose.model<IUser>('User', UserSchema)