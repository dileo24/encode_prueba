import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

export interface CreateUserArgs {
	name: string;
	email: string;
	password: string;
}

export interface UpdateUserArgs {
	id: string;
	name?: string;
	email?: string;
	password?: string;
	token: string;
}

export interface LoginUserArgs {
	email: string;
	password: string;
}
