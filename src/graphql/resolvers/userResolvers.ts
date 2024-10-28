import User from "../../models/userModel";
import { encrypt, compare } from "../../services/handleCrypt";
import { tokenSign, verifyToken } from "../../services/generateToken";
import {
	CreateUserArgs,
	UpdateUserArgs,
	LoginUserArgs,
	IUser,
} from "../../interfaces/userInterfaces";
import { ApolloError } from "apollo-server-express";

const userResolvers = {
	Query: {
		getAllUsers: async (): Promise<IUser[]> => {
			return await User.find();
		},
		getUserById: async (
			_: unknown,
			args: { id: string }
		): Promise<IUser | null> => {
			const userFinded = await User.findById(args.id);
			if (!userFinded) {
				throw new ApolloError("Usuario no encontrado.", "USER_NOT_FOUND");
			}
			return userFinded;
		},
	},

	Mutation: {
		createUser: async (_: unknown, args: CreateUserArgs): Promise<IUser> => {
			const { name, email, password } = args;
			const hashedPassword = await encrypt(password);
			const newUser = new User({ name, email, password: hashedPassword });

			await newUser.save();
			return newUser;
		},

		deleteUser: async (_: unknown, args: { id: string }): Promise<string> => {
			const userFinded = await User.findByIdAndDelete(args.id);
			if (!userFinded) {
				throw new ApolloError("Usuario no encontrado.", "USER_NOT_FOUND");
			}
			return "Usuario eliminado con éxito.";
		},

		updateUser: async (_: unknown, args: UpdateUserArgs): Promise<IUser> => {
			const { id, name, email, password, token } = args;
			const decoded = await verifyToken(token);

			if (!decoded) {
				throw new ApolloError("Token inválido.", "INVALID_TOKEN");
			}

			const updatedData: Partial<IUser> = { name, email };

			//si también quiere actualizar la pass se vuelve a encriptar
			if (password) {
				updatedData.password = await encrypt(password);
			}

			const userUpdated = await User.findByIdAndUpdate(id, updatedData, {
				new: true,
			});

			if (!userUpdated) {
				throw new ApolloError("Usuario no encontrado.", "USER_NOT_FOUND");
			}
			return userUpdated;
		},

		loginUser: async (
			_: unknown,
			args: LoginUserArgs
		): Promise<{ token: string }> => {
			const { email, password } = args;

			const user = await User.findOne({ email });
			if (!user) {
				throw new ApolloError(
					"No se encontró un usuario vinculado al correo ingresado.",
					"USER_NOT_FOUND"
				);
			}

			const isPasswordValid = await compare(password, user.password);
			if (!isPasswordValid) {
				throw new ApolloError("Contraseña incorrecta.", "INVALID_PASSWORD");
			}

			const token = await tokenSign(user);
			return { token };
		},
	},
};

export { userResolvers };
