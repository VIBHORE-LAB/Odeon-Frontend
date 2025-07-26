import { gql } from "@apollo/client";

export const GET_PLAYLISTS_STATS = gql`
  query GetPlaylistsStats($limit: Int = 20, $offset: Int = 20) {
    playlistsStats(limit: $limit, offset: $offset) {
      id
      name
      owner
      totalTracks
      public
      images {
        url
      }
    }
  }
`;
