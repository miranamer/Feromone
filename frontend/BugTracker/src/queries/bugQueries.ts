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

export {GET_BUGS};