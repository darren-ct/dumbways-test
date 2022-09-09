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

    console.log(token)
   
    return {
      headers: {
        ...headers,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJlbWFpbCI6ImRhcnJlbjAyMDguZGNAZ21haWwuY29tIiwiaWF0IjoxNjYyNTYxNzI4LCJleHAiOjE2NjUxNTM3MjgsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjYzMTc3NjIzMDEzYTZiMDAzMzdkOGQ1ZSIsImp0aSI6IjJhODE0ZTZmLTA2NjgtNDAyYy05YWE1LTkyODczM2Q5ZTNmZCJ9.oW5V7BdSNZKzPYRl6UwWnpdl27HYiDprtesXmTEMxrw`
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