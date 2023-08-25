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
    Checkbox
  } from '@chakra-ui/react'

import { ADD_BUG } from '../mutations/bugMutations'
import { GET_BUGS } from '../queries/bugQueries'
import { useMutation } from '@apollo/client'

const AddBug = ({isOpen, onClose, onOpen}) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [patched, setPatched] = useState<boolean>(true);
    const [severity, setSeverity] = useState<string>('');

    const handleSeverityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeverity(event.target.value);
    };

    const [addBug] = useMutation(ADD_BUG, {
        variables: {
            title,
            description,
            patched,
            severity
        },
        refetchQueries: [{query: GET_BUGS}]
    })


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