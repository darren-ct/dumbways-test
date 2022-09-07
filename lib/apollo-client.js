import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


function createApolloClient() {
  // Declare variable to store authToken
  let token;
   
  const httpLink = createHttpLink({
    uri: 'https://dev-testappynse2.microgen.id/graphql'
  });

  const authLink = setContext((_, { headers }) => {
   
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
   
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client;
};

const client = createApolloClient();

export default client;