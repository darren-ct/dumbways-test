import { gql } from "@apollo/client";


// GETS
export const GET_ATTENDANCES = gql`

query getAttendances($where : AttendanceFilter){
    attendances(where:$where){
      student{
        id
        firstName
      }
      
      id
      present
      sick
      absent
      permission
    }
  }`

// GET
export const GET_ATTENDANCE = gql`

query getAttendance($id:String!){
    attendance(id:$id){
         present
         sick
         absent
         permission
 }
}

`

export const GET_NON_ATTENDANCE = gql`
query searchStudents($where:UserFilter){
  users(where:$where){
  id 
  firstName
}}
`

// POST
export const POST_ATTENDANCE = gql`

mutation createAttendance($input:CreateAttendanceInput!){
    createAttendance(input:$input){
      id
    }
}`


// PUT
export const PUT_ATTENDANCE = gql`

mutation updateAttendance($id:String!,$input:UpdateAttendanceInput!){
    updateAttendance(id:$id input:$input){
      id
    }
  }`

// DELETE
export const DELETE_ATTENDANCE = gql`
mutation deleteAttendance($id:String!){
  deleteAttendance(id:$id){
    id
  }
}
`