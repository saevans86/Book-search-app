const { User } = require('../models');
const {
	signToken,
	AuthenticationError,
} = require('../utils/auth');

const resolvers = {
	Query: {
		// users: async () => {
		// 	return User.find().populate('savedBooks');
		// },
		// user: async (parent, { username }) => {
		// 	return User.findOne({ username }).populate('savedBooks');
		// },
		// books: async (parent, { username }) => {
		// 	const params = username ? { username } : {};
		// },
		// book: async (parent, { bookId }) => {
		// 	return User.findOne({ _id: bookId });
		// },
		me: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findOne({
					_id: context.user._id,
				})
					.select('-__v -password')
					.populate('savedBooks');

				return user;
			}
			throw AuthenticationError;
				
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
		saveBook: async (parent, { bookInput }, context) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $push: { savedBooks: bookInput } },
				{ new: true, runValidators: true }
			);
			return updatedUser;
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
