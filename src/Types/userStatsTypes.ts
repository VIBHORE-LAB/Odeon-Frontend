export interface UserStats {
  hoursListened: number;
  artistsDiscovered: number;
  songsInLibrary: number;
  playlistsCreated: number;
}

export interface PlaybackStatItem {
  label: string;
  description: string;
  icon: string;
  value: string | number;
}
