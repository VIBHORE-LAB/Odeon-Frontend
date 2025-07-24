import { gql } from "@apollo/client";

export const GET_TOP_ARTISTS = gql`
  query GetTopArtists($limit: Int!, $timeRange: String!) {
    topArtists(limit: $limit, timeRange: $timeRange) {
      id
      name
      genres
      popularity
      external_urls {
        spotify
      }
      images {
        url
        height
        width
      }
    }
  }
`;
