import { gql } from "@apollo/client";


// GETS
export const GET_BATCHES = gql`

query Batches($limit:Int,$skip:Int,$where:BatchFilter){
  batches(limit:$limit,skip:$skip,where:$where) {
    id
    name
  }
}
`;

// GET
export const GET_BATCH = gql`

query Batch($id:String!){
  batch(id:$id){
    id
    name
  }
}

`;

// POST
export const POST_BATCH = gql`

mutation createBatch($input:CreateBatchInput!){
  createBatch(input:$input){
    name
  }
}
`

// PUT
export const PUT_BATCH = gql`

mutation updateBatch($input:UpdateBatchInput!,$id:String!){
  updateBatch(input:$input id:$id){
     name
  }
}
`;

// DELETE
export const DELETE_BATCH = gql`

mutation deleteBatch($id:String!){
  deleteBatch(id:$id){
      name
  }
}
`;