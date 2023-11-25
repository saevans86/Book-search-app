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
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate('savedBooks');
		},
		// book: async (parent, { username }) => {
		// 	const params = username ? { username } : {};
		// },
		// books: async (parent, { bookId }) => {
		// 	return User.findOne({ _id: bookId });
		// },
		me: async (parent, args, context) => {
			if (context.user) {
				const me = await User.findOne({
					_id: context.user._id,
				})
					.select('-__v -password')
					.populate('savedBooks');
				// const token = signToken(me);
				return me;
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
		saveBook: async (parent, savedBooks, context) => {
			console.log(savedBooks, context.user);
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $addToSet: { savedBooks: savedBooks } },
				{ new: true, runValidators: true }
			);
			return updatedUser;
		},
		removeBook: async (parent, { bookId }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedBooks: { bookId: bookId } } },
					{ new: true }
				);
			}
			throw AuthenticationError;
		},
	},
};
module.exports = resolvers;
