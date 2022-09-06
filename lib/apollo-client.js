import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://dev-testappynse2.microgen.id/graphql",
    cache: new InMemoryCache(),
});

export default client;