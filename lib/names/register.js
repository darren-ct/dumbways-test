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