import { gql } from "@apollo/client";


// GETS
export const GET_CLASSES = gql`

query getClasses($where : ClassFilter){
    classes(where : $where){
      id
      type
      students{
        id
      }
    }
  }

`;

// GET
export const GET_CLASS = gql`

query getClass($id : String!){
    class(id : $id){
      type
      batch {
        id
        name
      }
    }
  }

`;


// POST
export const POST_CLASS = gql`
mutation createClass($input:CreateClassInput!){
  createClass(input : $input){
   id
   type
 }
}
`