import { gql } from "@apollo/client";


export const GET_PRODUCTIVITIES = gql`

query getProductivities($where:ProductivityFilter){
    productivities(where:$where){
      id
       student {
        id
        firstName
      }
      point
    }
  }
`;

export const GET_PRODUCTIVITY = gql`
query getProductivity($id:String!){
    productivity(id:$id){
      id
       student {
        id
        firstName
      }
      point
    }
  }
`

export const GET_NON_PRODUCTIVITY = gql`
query searchStudents($where:UserFilter){
  users(where:$where){
  id 
  firstName
}}`;

export const PUT_PRODUCTIVITY = gql`
mutation updateProductivity($id:String!,$input:UpdateProductivityInput!){
    updateProductivity(id:$id, input:$input){
      id
    }
  }
`

export const POST_PRODUCTIVITY = gql`
mutation PostProductivity($input:CreateProductivityInput!) {
    createProductivity(input:$input){
      id
      student{
        id
        firstName
      }
      point
    }
  }
`

export const DELETE_PRODUCTIVITY = gql`
mutation deleteProductivity($id:String!){
    deleteProductivity(id:$id){
      id
    }
  }
`