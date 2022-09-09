import { gql } from "@apollo/client";


// GETS
export const GET_SOFTSKILLS = gql`

query getSoftSkills($where : SoftSkillFilter){
    softSkills(where:$where){
         id
         point
         student{
          id
          firstName
        }
}
}`

// GET
export const GET_SOFTSKILL = gql`

query getSoftSkill($id : String!){
    softSkill(id:$id){
         id
         point
         student{
          id
          firstName
        }
}
}`

export const GET_NON_SOFTSKILL = gql`
  query searchStudents($where:UserFilter){
    users(where:$where){
    id 
    firstName
  }}
  `


// PUT
export const PUT_SOFTSKILL = gql`

mutation editSoftSkill($id:String!,$input:UpdateSoftSkillInput!){
    updateSoftSkill(input:$input id:$id){
        id
}
}`


// POST
export const POST_SOFTSKILL = gql`

mutation addSoftSkill($input:CreateSoftSkillInput!){
    createSoftSkill(input:$input){
        id
}
}`
  
// DELETE
export const DELETE_SOFTSKILL = gql`
mutation deleteSoftSkill($id:String!){
    deleteSoftSkill(id:$id){
        id
}
}`
  
