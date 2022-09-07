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