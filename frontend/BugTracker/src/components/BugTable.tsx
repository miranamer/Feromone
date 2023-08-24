import React from 'react'
import { ChakraProvider, Spinner, Badge, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import BugRow from './BugRow'
import { GET_BUGS } from '../queries/bugQueries'
import { useQuery } from '@apollo/client'

const BugTable = ({severityColorMap, severityInsectMap}) => {

  const {loading, error, data} = useQuery<Bug[]>(GET_BUGS);

  type Bug = {
    id: number,
    title: string,
    description: string,
    severity: string,
    patched: boolean
  }


  if(loading) return <Spinner />
  if(error) return <p>ERROR!</p>

  return (
    <>
    {!loading && !error && <div className="w-[60%]">
            <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Bug Title</Th>
                      <Th>Bug Description</Th>
                      <Th>Severity</Th>
                      <Th>Patched?</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.allBugs.map((bug) => {
                      return (
                        <BugRow key={bug.id} bug={bug} severityColorMap={severityColorMap} severityInsectMap={severityInsectMap} />
                      )
                    })}
                  </Tbody>
                  <Tfoot>
                  </Tfoot>
                </Table>
            </TableContainer>
          </div>}
          </>
  )
}

export default BugTable