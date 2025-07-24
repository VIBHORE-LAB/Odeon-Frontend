import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    me {
      display_name
      followers
      image
    }
  }
`;
