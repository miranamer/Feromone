import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Bugs from './pages/Bugs';
import NavBar from './components/NavBar';
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import ViewBug from './pages/ViewBug';


function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
  });
  
  

  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Bugs />} />
            <Route path='/view' element={<ViewBug />} />
          </Routes>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default App
