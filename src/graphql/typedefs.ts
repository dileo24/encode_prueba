import { gql } from "apollo-server-express";

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
	}

	type Token {
		token: String!
	}

	type Query {
		getAllUsers: [User]
		getUserById(id: ID): User
	}

	type Mutation {
		createUser(name: String!, email: String!, password: String!): User
		deleteUser(id: ID!): String
		updateUser(
			id: ID!
			name: String
			email: String
			password: String
			token: String!
		): User
		loginUser(email: String!, password: String!): Token!
	}
`;

export { typeDefs };
