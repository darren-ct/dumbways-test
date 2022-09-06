import {ApolloProvider} from '@apollo/client';
import client from '../lib/apollo-client'

import '../styles/globals.css'

import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
  </ApolloProvider> )
}

export default MyApp
 