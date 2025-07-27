import { gql } from "@apollo/client";
export const GET_FOLLOWED_ARTISTS = gql`
  query GetFollowedArtists($limit: Int = 20) {
    followedArtists(limit: $limit) {
      total
      items {
        id
        name
        genres
        popularity
        images {
          url
          height
          width
        }
        external_urls {
          spotify
        }
      }
    }
  }
`;
