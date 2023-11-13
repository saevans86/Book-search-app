const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		user: async () => {
			return User.find().populate('books');
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
		saveBook: async (parent, { savedBooks }, context) => {
			if (context.user) {
				const book = await User.findOneAndUpdate(
					{ _id: savedBooks._id },
					{ $addToSet: { savedBooks: body } },
					{ new: true, runValidators: true }
				);
				// should not need code below since we're saving the book info by the body and already updating by user..
				// await User.findByIdAndUpdate(
				// 	{
				// 		_id: context.user._id,
				// 	},

				// 	{ $addToSet: { book: book._id } }
				// );
				return book;
			}
			throw AuthenticationError;
		},
		removeBook: async (parent, { user, params }, context) => {
			if (context.user) {
				return User.findOneAndUpdate(
					{ _id: user._id },
					{ $pull: { savedBooks: { bookId: params.bookId } } },
					{ new: true }
				);
			}
			throw AuthenticationError;
		},
	},
};
module.exports = resolvers;