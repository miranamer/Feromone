import { gql } from "@apollo/client";

const DELETE_BUG = gql`
    mutation deleteBug($id: ID!){
        deleteBug(id: $id){
            id
          }
    }
`

const ADD_BUG = gql`
    mutation addBug($title: String!, $description: String!, $severity: String!, $patched: Boolean!, $vulnerableTech: [String], $comments: [String]){
        addBug(title: $title, description: $description, severity: $severity, patched: $patched, vulnerableTech: $vulnerableTech, comments: $comments){
            id
            title
        }
    }
`

const PATCH_BUG = gql`
    mutation patchBug($id: ID!){
        patchBug(id: $id){
            id
            patched
        }
    }
`

export {DELETE_BUG, ADD_BUG, PATCH_BUG}