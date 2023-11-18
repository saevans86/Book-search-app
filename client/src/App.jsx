import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';


const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });
const client = new ApolloClient({
	_link: authLink.concat(httpLink),
	get link() {
		return this._link;
	},
	set link(value) {
		this._link = value;
	},
	cache: new InMemoryCache()
}) 

function App() {
  return (
			<ApolloProvider client={client}>
				<Navbar />
				<Outlet />
			</ApolloProvider>
		);
}

export default App;
