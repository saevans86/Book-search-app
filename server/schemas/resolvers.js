const { User } = require('../models');
const {
	signToken,
	AuthenticationError,
} = require('../utils/auth');


const resolvers = {
	Query: {

		me: async (parent, args, context) => {
			// console.log(userData);
			const userData = await User.findOne({
				_id: context.user._id,
			}).select('-__v -password');
			return userData;
		},
		user: async (parent, { userId }) => {
			return User.findOne({ _id: userId });
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const loginUser = await User.findOne({ email });
			if (!loginUser) {
				throw AuthenticationError;
			}
			const loginPassword = await loginUser.isCorrectPassword(
				password
			);
			if (!loginPassword) {
				throw AuthenticationError;
			}

			const token = signToken(loginUser);
			return { token, loginUser };
		},
		addUser: async (
			parent,
			{ username, email, password }
		) => {
			const user = await User.create({
				username,
				email,
				password,
			});
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (
			parent,
			{ userId, savedBooks },
			context
		) => {
			if (context.user) {
				const book = await User.findOneAndUpdate(
					{ _id: userId._id },
					{ $addToSet: { savedBooks: savedBooks } },
					{ new: true, runValidators: true }
				);
			}
			throw AuthenticationError;
		},
		removeBook: async (
			parent,
			{ userId, savedBooks },
			context
		) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: userId._id },
					{ $pull: { savedBooks: savedBooks } },
					{ new: true }
				);
			}
			throw AuthenticationError;
		},
	},
};
module.exports = resolvers;