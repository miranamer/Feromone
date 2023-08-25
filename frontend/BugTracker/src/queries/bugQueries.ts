import {gql} from '@apollo/client'


const GET_BUGS = gql`
  query getBugs{
    allBugs{
      id
      title
      description
      severity
      patched
    }
  }
`

const SEARCH_BUGS = gql`
query searchBugs($query: String!){
  searchBugs(query: $query){
    id
    title
    severity
    description
    patched
  }
}`

const GET_PATCHED_BUGS = gql`
  query getPatchedBugs {
    allPatchedBugs {
      id
      title
      description
      severity
      patched
    }
  }
`;

// Query to fetch bugs by severity
const GET_BUGS_BY_SEVERITY = gql`
  query getBugsBySeverity($bugSeverity: String!) {
    bugsBySeverity(bugSeverity: $bugSeverity) {
      id
      title
      description
      severity
      patched
    }
  }
`;

export {GET_BUGS, SEARCH_BUGS, GET_PATCHED_BUGS, GET_BUGS_BY_SEVERITY};