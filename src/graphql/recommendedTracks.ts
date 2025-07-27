import { gql } from "@apollo/client";

export const GET_RANDOM_TRACKS = gql`
  query GetRandomRecommendedTracks {
    randomRecommendedTracks {
      id
      name
      durationMs
      previewUrl
      album {
        name
        imageUrl
      }
      artists {
        id
        name
      }
    }
  }
`;
