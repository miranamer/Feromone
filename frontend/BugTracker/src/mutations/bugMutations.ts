import { gql } from "@apollo/client";

const DELETE_BUG = gql`
    mutation deleteBug($id: ID!){
        deleteBug(id: $id){
            id
          }
    }
`

export {DELETE_BUG}