import { gql } from "@apollo/client";


// GETS
export const GET_STUDENTS = gql`

query getStudents($id:String!){
    class(id:$id){
      students{
        id
        firstName
        email
        role
      }
  }
}
`;

// GETS
export const GET_NON_MEMBERS = gql`
query searchStudents($where:UserFilter){
  users(where:$where){
  id 
  firstName
}
}
`

// REMOVE
export const REMOVE_STUDENT = gql`

mutation removeStudent($userId:String!,$classId:String!){
  removeUserOnClass(userId:$userId,classId:$classId){
      id
  }
}

`;

// POST
export const ADD_STUDENT = gql`

mutation addStudent($userId:String!,$classId:String!){
  addUserOnClass(userId:$userId,classId:$classId){
     id
  }
}

`;