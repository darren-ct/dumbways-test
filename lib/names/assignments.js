import { gql } from "@apollo/client";


export const GET_SINGLE_PERSON_ASSIGNMENT = gql`
query getAssignments($where:AssignmentFilter){
    assignments(where:$where){
      id
      student{
        id
        firstName
      }
      point
      subject{
        id
        name
        percentage
        subCategory{
          id
          name
          percentage
          
        }
        
      }
    }
  }

`;

export const GET_NON_ASSIGNED = gql`
query searchStudents($where:UserFilter){
  users(where:$where){
  id 
  firstName
}}
`;

export const DELETE_ASSIGNMENTS = gql`
mutation deleteAssignments($ids:[ID]!){
    deleteAssignments(ids:$ids){
      __typename
    }
  }
`;

export const PUT_ASSIGNMENTS = gql`
mutation editAssignments($inputs:[UpdateAssignmentInputs]!){
    updateAssignments(inputs:$inputs){
      __typename
    }
  }
`;

export const POST_ASSIGNMENTS = gql`
mutation postAssignments($inputs:[CreateAssignmentInput]!){
    createAssignments(inputs:$inputs){
      __typename
    }
  }
`;