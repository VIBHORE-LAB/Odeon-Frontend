export type Artist = {
  id: string;
  name: string;
};

export type Album = {
  name: string;
  imageUrl: string | null;
};

export type RandomTrack = {
  id: string;
  name: string;
  durationMs: number;
  previewUrl: string | null;
  album: Album;
  artists: Artist[];
};
