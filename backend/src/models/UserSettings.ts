import mongoose, { Document, Schema } from "mongoose";

export interface IUserSettings extends Document {
	user: mongoose.Types.ObjectId;
	defaultStatus: mongoose.Types.ObjectId;
}

const UserSettings: Schema = new Schema({
	user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
	defaultStatus: {
		type: mongoose.Types.ObjectId,
		ref: "JobStatus",
		required: true,
	},
});

export default mongoose.model<IUserSettings>("UserSettings", UserSettings);
