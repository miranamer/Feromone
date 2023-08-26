import {useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useDisclosure,
    Select,
    Checkbox,
    Badge
  } from '@chakra-ui/react'

import {AiOutlineClose} from 'react-icons/ai'

import { ADD_BUG } from '../mutations/bugMutations'
import { GET_BUGS } from '../queries/bugQueries'
import { useMutation } from '@apollo/client'

const AddBug = ({isOpen, onClose, onOpen}) => {

    //! ADD OPTION TO ADD VULN TECH

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [patched, setPatched] = useState<boolean>(true);
    const [severity, setSeverity] = useState<string>('');
    const [vulnTech, setVulnTech] = useState<string[]>([]);
    const [vulnTechInput, setVulnTechInput] = useState<string>('');

    const handleSeverityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeverity(event.target.value);
    };

    const [addBug] = useMutation(ADD_BUG, {
        variables: {
            title,
            description,
            patched,
            severity,
            vulnerableTech: vulnTech
        },
        refetchQueries: [{query: GET_BUGS}]
    })

    const addVulnTech = (e) => {
      e.preventDefault()
      setVulnTech([...vulnTech, vulnTechInput]);
      setVulnTechInput('');
    }

    const removeVulnTech = (index) => {
      let newVulnTech = [];

      vulnTech.forEach((tech, id) => {
        id !== index ? newVulnTech.push(tech) : null;
      })

      setVulnTech(newVulnTech);
    }


  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add A Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-3 items-center justify-center">
                <Input onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' />
                <Input onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' />
                <Select placeholder='Select Severity' value={severity} onChange={handleSeverityChange}>
                    <option value="Low">Low 🐛</option>
                    <option value="Medium">Medium 🦗</option>
                    <option value="High">High 🐜</option>
                    <option value="Very_High">Very High 🕷️</option>
                    <option value="Extreme">Extreme 🦂</option>
                    <option value="Code_Red">Code Red 🚨</option>
                </Select>
                <form className='w-full' action="" onSubmit={(e) => addVulnTech(e)}>
                  <Input value={vulnTechInput} onChange={(e) => setVulnTechInput(e.target.value)} placeholder='Enter Vuln Tech (Press Enter)' />
                </form>
                <div className="flex flex-wrap gap-3 p-3 w-full bg-gray-700 rounded-md border-2 border-gray-400">
                  {vulnTech.length > 0 ? (
                    vulnTech.map((tech, index) => (
                      <p key={index}>
                        <Badge colorScheme='red'>
                          {tech} <span onClick={() => removeVulnTech(index)} className='text-black hover:cursor-pointer'>X</span>
                        </Badge>
                      </p>
                    ))
                  ) : (
                    <p className='text-white'>No Vuln Tech!</p>
                  )}
                </div>
                <Checkbox isChecked={patched} onChange={(e) => setPatched(e.target.checked)}>Patched?</Checkbox>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={addBug} colorScheme='green' mr={3}>
              Submit
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddBug