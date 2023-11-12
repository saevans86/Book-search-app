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
		saveBook: async (parent, { addBook }, context) => {
			if (context.user) {
				const book = await User.create({
					bookTitle,
					bookDescription,
					bookImage,
					bookLink: context.user.email,
				});
				await User.findByIdAndUpdate(
					{
						_id: context.user._id,
					},
					{ $addToSet: { book: book._id } }
				);
				return book;
			}
			throw AuthenticationError;
		},
		removeBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const removelistedBook = await User.findByIdAndDelete({
					_id: bookId,
					email: context.user.email,
				});

				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $pull: { book: removelistedBook._id } }
				);
			}
		},
	},
};
