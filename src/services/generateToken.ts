import { JwtPayload, sign, verify } from "jsonwebtoken";
import dotenv from "../config/dotenv";
import { IUser } from "../interfaces/userInterfaces";

export const tokenSign = async (user: IUser) => {
	return sign(
		{
			id: user.id,
		},
		dotenv.JWT_SECRET
	);
};
export const verifyToken = async (token: string) => {
	try {
		return verify(token, dotenv.JWT_SECRET) as JwtPayload;
	} catch (error) {
		return null;
	}
};
