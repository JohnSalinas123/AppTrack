import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const dbConnectionString = process.env.MONGODB_URI;
if (!dbConnectionString) {
	throw new Error("MONGODB_URI is not defined")
}

const connectToDB = async () => {
    try {
        await mongoose.connect(dbConnectionString, {
            autoIndex: true
        })
        console.log("Connected to Mongodb Atlas")
    } catch (error) {
        console.log(error)
    }

}

export default connectToDB;