import mongoose from "mongoose";
import dotenv from "./dotenv";

const connectDB = async () => {
	try {
		await mongoose.connect(dotenv.MONGO_URI, {});
		console.log("MongoDB conectado.");
	} catch (err: any) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
