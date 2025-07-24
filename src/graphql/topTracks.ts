import { gql } from "@apollo/client";

export const GET_TOP_TRACKS = gql`
  query {
    topTracks {
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
