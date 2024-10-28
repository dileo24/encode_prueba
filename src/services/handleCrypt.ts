import bcrypt from "bcrypt";

export const encrypt = async (pass: string): Promise<string> => {
	const passHash = await bcrypt.hash(pass, 10);
	return passHash;
};

export const compare = async (
	pass: string,
	passHash: string
): Promise<boolean> => {
	return await bcrypt.compare(pass, passHash);
};
