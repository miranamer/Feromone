import { useState } from 'react'
import { ChakraProvider, useDisclosure, Button, Select, Badge, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Input, } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import BugTable from '../components/BugTable';
import {AiOutlinePlus} from 'react-icons/ai'
import AddBug from '../components/AddBug';

function Bugs() {
  
  //^ Low (🐛), Medium (🦗), High (🐜), Very High (🕷️), Extreme (🦂)

  const severityColorMap = {
    'Low': 'green',
    'Medium': 'cyan',
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

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
          <div className="flex flex-col gap-5 items-center justify-center mt-[10%]">
            <h1 className='text-2xl mb-2 underline'>All Bugs</h1>
            <div className="flex row gap-3 items-center justify-center">
            <Button onClick={onOpen} className='w-[110px]' colorScheme='green'>Add <span className='ml-1'><AiOutlinePlus /></span></Button>
              <Input onChange={(e) => setSearch(e.target.value)} placeholder='Search Bug or ID' />
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
                  <option value="Very_High">Very High</option>
                  <option value="Extreme">Extreme</option>
                  <option value="Code_Red">Code Red</option>
                </Select>
              )}
            </div>
            <AddBug isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            <BugTable nestedValue={nestedValue} selectedValue={selectedValue} search={search} severityColorMap={severityColorMap} severityInsectMap={severityInsectMap} />
          </div>
    </>
  )
}

export default Bugs