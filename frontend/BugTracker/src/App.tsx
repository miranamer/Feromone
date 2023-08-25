import { useState } from 'react'
import { ChakraProvider, Button, Select, Badge, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Input, } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import BugTable from './components/BugTable';
import {AiOutlinePlus} from 'react-icons/ai'


function App() {
  
  //^ Low (🐛), Medium (🦗), High (🐜), Very High (🕷️), Extreme (🦂)

  const severityColorMap = {
    'Low': 'green',
    'Medium': 'brown',
    'High': 'yellow',
    'Very_High': 'orange',
    'Extreme': 'purple',
    'Code_Red': 'red'
  }

  const severityInsectMap = {
    'Low': '🐛',
    'Medium': '🦗',
    'High': '🐜',
    'Very_High': '🕷️',
    'Extreme': '🦂',
    'Code_Red': '🚨'
  }

  const [search, setSearch] = useState<string>("");

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [nestedValue, setNestedValue] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleNestedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNestedValue(event.target.value);
  };

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
            <div className="flex row gap-3 items-center justify-center">
            <Button className='w-[110px]' colorScheme='green'>Add <span className='ml-1'><AiOutlinePlus /></span></Button>
              <Input onChange={(e) => setSearch(e.target.value)} placeholder='Search Bug' />
              <Select value={selectedValue} onChange={handleSelectChange}>
                <option value="">Order By</option>
                <option value="severity">By Severity</option>
                <option value="patched">By Patched</option>
              </Select>
              {selectedValue === 'severity' && (
                <Select value={nestedValue} onChange={handleNestedChange} variant='filled'>
                  <option value="">Select A Severity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                  <option value="Extreme">Extreme</option>
                  <option value="Code_Red">Code_Red</option>
                </Select>
              )}
            </div>
            <BugTable nestedValue={nestedValue} selectedValue={selectedValue} search={search} severityColorMap={severityColorMap} severityInsectMap={severityInsectMap} />
          </div>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default App
