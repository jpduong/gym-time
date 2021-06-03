import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        _id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;
