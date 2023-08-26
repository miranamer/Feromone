import {useState, useEffect} from 'react'
import { ChakraProvider, Spinner, Badge, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import BugRow from './BugRow'
import { GET_BUGS, SEARCH_BUGS, GET_PATCHED_BUGS, GET_BUGS_BY_SEVERITY, GET_BUG_BY_ID } from '../queries/bugQueries'
import { DocumentNode, useQuery } from '@apollo/client'

interface BugTableProps{
  nestedValue: string,
  selectedValue: string,
  search: string,
  severityColorMap: object,
  severityInsectMap: object
}

const BugTable = (props:BugTableProps) => {
  
  type Bug = {
    id: number,
    title: string,
    description: string,
    severity: string,
    patched: boolean
  }

  const [query, setQuery] = useState<DocumentNode>(GET_BUGS);
  
  useEffect(() => {
    if (props.search !== '') {
      const isnum = /^\d+$/.test(props.search);
      isnum ? setQuery(GET_BUG_BY_ID) : setQuery(SEARCH_BUGS);
    } else if (props.selectedValue === 'patched') {
      setQuery(GET_PATCHED_BUGS);
    } else if (props.selectedValue === 'severity') {
      setQuery(GET_BUGS_BY_SEVERITY);
    } else if (props.search === ''){
      setQuery(GET_BUGS);
    }

  }, [props.search, props.selectedValue]);

  //const bugSeverity = BugSeveritiesEnum[props.nestedValue as keyof typeof BugSeveritiesEnum];

  const {loading, error, data} = useQuery(query,
  {
    variables: {
      query: props.search,
      bugSeverity: props.nestedValue,
      id: props.search,
      //sortBySeverity: true
    }
  }
);

  if(loading) return <Spinner />
  if(error) return <p>ERROR!</p>

  let dataVar;

  switch(query){
    case(GET_BUGS):
      dataVar = data.allBugs;
      break;
    case(GET_BUG_BY_ID):  
      if(data.bugFromID[0] === null){
        dataVar = data.allBugs;
      }
      else{
        dataVar = data.bugFromID;
      }
      break;
    case(SEARCH_BUGS):
      dataVar = data.searchBugs;
      break;
    case(GET_PATCHED_BUGS):
      dataVar = data.allPatchedBugs;
      break;
    case(GET_BUGS_BY_SEVERITY):
      dataVar = data.bugsBySeverity;
      break;
    default:
      return <h1>Order By Error</h1>
  }

  console.log(data);
  //! if search is only number, then find by id query should run else just search query

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
                    {dataVar?.map((bug: Bug) => {
                      return (
                        <BugRow key={bug.id} bug={bug} severityColorMap={props.severityColorMap} severityInsectMap={props.severityInsectMap} />
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