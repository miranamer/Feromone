import { useState } from 'react'
import { ChakraProvider, Button, Select, Badge, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import BugTable from './components/BugTable';
import {AiOutlinePlus} from 'react-icons/ai'


function App() {
  
  //^ Low (🐛), Medium (🦗), High (🐜), Very High (🕷️), Extreme (🦂)

  const severityColorMap = {
    'Low': 'green',
    'Medium': 'yellow',
    'High': 'orange',
    'Very High': 'red',
    'Extreme': 'purple'
  }

  const severityInsectMap = {
    'Low': '🐛',
    'Medium': '🦗',
    'High': '🐜',
    'Very High': '🕷️',
    'Extreme': '🦂'
  }

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <NavBar />
          <div className="flex flex-col gap-5 items-center justify-center mt-[10%]">
            <h1 className='text-2xl mb-2 underline'>All Bugs</h1>
            <div className="flex row gap-5 items-center justify-center">
            <Button colorScheme='green'>Add <span className='ml-1'><AiOutlinePlus /></span></Button>
              <Select placeholder='Sort By'>
                <option value='option1'>Severity</option>
                <option value='option2'>ID</option>
              </Select>
            </div>
            <BugTable severityColorMap={severityColorMap} severityInsectMap={severityInsectMap} />
          </div>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default App
