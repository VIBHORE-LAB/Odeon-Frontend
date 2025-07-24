export interface Track {
  id: string;
  name: string;
  artists: string[];
  album: {
    name: string;
    release_date: string;
    album_type: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  external_urls: {
    spotify: string;
  };
}

