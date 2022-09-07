import { gql } from "@apollo/client";


export const REGISTER = gql`

mutation Register($input: RegisterInput) {

    register( input: $input ) {
      token
      user {
        id
        firstName
      }
    }

  }
`;

// {
//     "input": {
//       "email": "darren0208.dc@gmail.com",
//       "password": "9383094890",
//       "firstName": "Darren"
//     }
//   }


// {
//   "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJlbWFpbCI6ImRhcnJlbjAyMDguZGNAZ21haWwuY29tIiwiaWF0IjoxNjYyNTU2Nzc3LCJleHAiOjE2NjUxNDg3NzcsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjYzMTc3NjIzMDEzYTZiMDAzMzdkOGQ1ZSIsImp0aSI6IjliNGMwZDc3LTgyYjYtNGFmNi05YmE3LTQxYjM1ZTc4YmI3YiJ9.r4g0LxczEz7ig1EBD5F-q_hQDitaooIIpuJvECC1L7Q"
// }