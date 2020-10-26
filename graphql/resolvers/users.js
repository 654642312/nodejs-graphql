const bcrytpt = require("bcrytptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { SECRECT_KEY } = require("../../config");

module.exports = {
	Mutation: {
		async register(
			_,
			{
				registerInput: {
					username,
					email,
					password,
					confirmPassword,
				},
			},
			context,
			info
		) {
			password = await bcrytpt.hash(password, 12);
			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = jwt.sign(
				{
					id: res.id,
					email: res.email,
					username: res.username,
				},
				SECRECT_KEY,
				{ expiresIn: "1h" }
			);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
