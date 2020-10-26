const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost/mongodb", options)
	.then(() => {
		console.log("MongoDB is connected");
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	});
