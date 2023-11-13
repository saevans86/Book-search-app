import { gql } from '@apollo/client';

export const GET_ME = gql`
	query users {
		username {
			_id
			email
			password
			savedBooks
		}
	}
`;
