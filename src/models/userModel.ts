import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/userInterfaces";

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export default model<IUser>("User", userSchema);
