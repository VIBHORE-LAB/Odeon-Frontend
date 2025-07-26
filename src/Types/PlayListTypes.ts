export interface PlayListImage {
  url: string;
  height?: number;
  width?: number;
}

export interface PlayList {
  id: string;
  name: string;
  owner: string;
  totalTracks: number;
  public: boolean;
  images: PlayListImage[];
}

