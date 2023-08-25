import {React, useState} from 'react'
import {Text, Badge, Box, Divider, Button,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea} from '@chakra-ui/react'
import { ADD_COMMENT } from '../mutations/bugMutations'
import { GET_BUGS } from '../queries/bugQueries'
import { useMutation } from '@apollo/client'


const CommentModal = ({isOpen, onClose, id}) => {

    const [comment, setComment] = useState<string>('');

    const [addComment] = useMutation(ADD_COMMENT, {
        variables: {
            id: id,
            comment
        },
        refetchQueries: [{query: GET_BUGS}]
    })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea onChange={(e) => setComment(e.target.value)} placeholder='Enter Comment' />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={addComment}>
              Submit
            </Button>
            <Button onClick={onClose} variant='ghost' colorScheme='red'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default CommentModal