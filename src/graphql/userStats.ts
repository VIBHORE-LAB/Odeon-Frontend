import { gql } from "@apollo/client";

export const GET_USER_STATS = gql`
  query GetUserStats($year: Int = 2025) {
    userStats(year: $year) {
      hoursListened
      artistsDiscovered
      songsInLibrary
      playlistsCreated
    }
  }
`;
