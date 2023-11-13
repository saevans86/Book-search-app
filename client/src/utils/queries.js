import { gql } from '@apollo/client';

export const GET_ME = gql`
	query users {
		user {
		_id
		email
		password
		}
	}
`;
