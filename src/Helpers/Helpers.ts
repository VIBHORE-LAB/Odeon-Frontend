import type { PlaybackStatItem, UserStats } from "../Types/userStatsTypes";

export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
export const mapUserStatsToPlaybackStats = (
  userStats: UserStats,
): PlaybackStatItem[] => [
  {
    label: "Seconds Listened",
    description: "Total time spent vibing",
    icon: "🎧",
    value: userStats.hoursListened * 60 * 60,
  },
  {
    label: "Artists Discovered",
    description: "New artists you explored",
    icon: "🧑‍🎤",
    value: userStats.artistsDiscovered,
  },
  {
    label: "Liked Songs",
    description: "Songs Liked By You",
    icon: "🎶",
    value: userStats.songsInLibrary,
  },
  {
    label: "Playlists Created",
    description: "Curated by you",
    icon: "📂",
    value: userStats.playlistsCreated,
  },
];
