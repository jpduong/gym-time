import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($userInput: UserInput!) {
    register(userInput: $userInput) {
      user {
        _id
        email
      }
      error {
        field
        message
      }
    }
  }
`;
