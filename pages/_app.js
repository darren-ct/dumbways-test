import { createContext, useState, useEffect} from 'react';
import {ApolloProvider} from '@apollo/client';
import client from '../lib/apollo-client'

import '../styles/globals.css'

import Header from '../components/Header'


export const AppContext = createContext(null);

function MyApp({ Component, pageProps }) {

  // Shared state
  const [user,setUser] = useState(null);
  const [token, setToken] = useState(null);

  // effects
  useEffect(()=>{
      const token = JSON.parse(localStorage.getItem("token"));
      if(token) setToken(token)
  },[]);

  useEffect(()=>{
        if(token) localStorage.setItem("token", JSON.stringify(token));
  },[token])

  return (
    <AppContext.Provider value={{user, setUser,token,setToken}}>
         <ApolloProvider client={client}>
             {token && <Header/>}
             <Component {...pageProps} />
         </ApolloProvider>
   </AppContext.Provider>

   )
}

export default MyApp
 
// Smarter move is to set as cookie and at prerendering return user / not, do this at every page