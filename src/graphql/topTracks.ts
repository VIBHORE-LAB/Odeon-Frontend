import { gql } from "@apollo/client";

export const GET_TOP_TRACKS = gql`

    query GetTopTracks($limit: Int!, $timeRange: String!) {
    topTracks(limit: $limit, timeRange: $timeRange) {
      id
      name
      artists
      album {
        name
        release_date
        album_type
        images {
          url
          height
          width
        }
      }
      external_urls {
        spotify
      }
    }
  }
`;
