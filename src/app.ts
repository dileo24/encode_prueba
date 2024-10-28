import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/database";
import dotenv from "./config/dotenv";
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers/resolvers";

async function start() {
	const PORT = dotenv.PORT;
	const app: any = express();

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await apolloServer.start();

	connectDB();
	app.use(express.json());

	apolloServer.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log("Server corriendo en el puerto ", PORT);
	});
}

start();
