import React from 'react'
import {Tr, Td, Badge} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { DELETE_BUG, PATCH_BUG } from '../mutations/bugMutations';
import { GET_BUGS } from '../queries/bugQueries';
import {AiFillDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom';

const BugRow = ({bug, severityColorMap, severityInsectMap}) => {

    const [deleteBug] = useMutation(DELETE_BUG, {
        variables: {
            id: bug.id
        },
        refetchQueries: [{query: GET_BUGS}]
    })

    const [patchBug] = useMutation(PATCH_BUG, {
        variables: {
            id: bug.id
        },
        refetchQueries: [{query: GET_BUGS}]
    })

    const viewBugData = {
        id: bug.id,
        title: bug.title,
        description: bug.description,
        severity: bug.severity,
        patched: bug.patched,
        vulnerableTech: bug.vulnerableTech,
        comments: bug.comments,
      }

  return (
    <>
        <Tr key={bug.id}>
  <Td>{bug.id}</Td>
  <Td isTruncated>
  <Link
  to='/view' state={{data: viewBugData}}
  className='text-blue-400 font-semibold underline hover:cursor-pointer'
>
  {bug.title}
</Link>
  </Td>
  <Td isTruncated>{bug.description}</Td>
  <Td>
    <Badge colorScheme={`${severityColorMap[bug.severity]}`}>
      {bug.severity} - {severityInsectMap[bug.severity]}
    </Badge>
  </Td>
  <Td>
    <Badge
      onClick={patchBug}
      className='hover:cursor-pointer'
      variant='outline'
      colorScheme={bug.patched ? 'green' : 'red'}
    >
      {bug.patched ? 'Yes' : 'No'}
    </Badge>
  </Td>
  <Td>
    <p
      onClick={deleteBug}
      className='text-white hover:cursor-pointer w-[30px] h-[30px] bg-red-500 flex items-center justify-center rounded-md hover:bg-red-700'
    >
      <AiFillDelete />
    </p>
  </Td>
</Tr>
    </>
  )
}

export default BugRow