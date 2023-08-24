import React from 'react'
import {Tr, Td, Badge} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { DELETE_BUG } from '../mutations/bugMutations';
import { GET_BUGS } from '../queries/bugQueries';
import {AiFillDelete} from 'react-icons/ai'

const BugRow = ({bug, severityColorMap, severityInsectMap}) => {

    const [deleteBug] = useMutation(DELETE_BUG, {
        variables: {
            id: bug.id
        },
        refetchQueries: [{query: GET_BUGS}]
    })

  return (
    <>
        <Tr key={bug.id}>
            <Td>{bug.id}</Td>
            <Td>{bug.title}</Td>
            <Td isTruncated>{bug.description}</Td>
            <Td><Badge colorScheme={`${severityColorMap[bug.severity]}`}>{bug.severity} - {severityInsectMap[bug.severity]}</Badge></Td>
            <Td className='text-red-500 font-semibold'><Badge variant='outline' colorScheme={bug.patched ? 'green' : 'red'}>{bug.patched ? 'Yes' : 'No'}</Badge></Td>
            <Td><p onClick={deleteBug} className='text-white hover:cursor-pointer w-[30px] h-[30px] bg-red-500 flex items-center justify-center rounded-md'><AiFillDelete /></p></Td>
        </Tr>
    </>
  )
}

export default BugRow