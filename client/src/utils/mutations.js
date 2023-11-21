import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				email
				
			}
		}
	}
`;
// export const LOGIN_USER = gql`
// 	mutation Login($email: String!, $password: String!) {
// 		login(email: $email, password: $password) {
// 			token
// 			user {
// 				email
// 				password
// 			}
// 		}
// 	}
// `;



export const ADD_USER = gql`
	mutation addUser(
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
				password
			}
		}
	}
`;

// export const SAVE_BOOK = gql`
//   mutation saveBook($input: BookInput) {
//     saveBook(input: $input) {
//       _id
//       username
//       bookCount
//       savedBooks {
//         bookId
//         authors
//         image
//         link
//         title
//         description
//       }
//     }
//   }
// `;
export const SAVE_BOOK = gql`
	mutation saveBook(
		$authors: [String]
		$description: String
		$bookId: String
		$image: String
		$link: String
		$title: String
	) {
		saveBook(
			authors: $authors
			description: $description
			bookId: $bookId
			image: $image
			link: $link
			title: $title
		) 
		{
			_id
			username
			email
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;
export const REMOVE_BOOK = gql`
	mutation removeBook($book: String) {
		removeBook(book: $book) {
			bookId
		}
	}
`;
