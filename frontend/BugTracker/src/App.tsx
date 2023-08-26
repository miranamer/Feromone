import { useEffect, useState } from 'react'
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
  
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const currMode = window.localStorage.getItem('chakra-ui-color-mode');
    if(currMode == 'light'){
      setDarkMode(false);
    }
    else{
      setDarkMode(true);
    }
  }, [])

  const toggleDarkMode = () => {
    const currMode = window.localStorage.getItem('chakra-ui-color-mode');
    
    if(currMode == 'light'){
      window.localStorage.setItem('chakra-ui-color-mode', 'dark');
    }
    else{
      window.localStorage.setItem('chakra-ui-color-mode', 'light');
    }

    console.log(currMode)

    setDarkMode(!darkMode);

    location.reload();
  }

  console.log('MODE: ', darkMode);
  

  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <NavBar mode={darkMode} darkMode={toggleDarkMode} />
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
