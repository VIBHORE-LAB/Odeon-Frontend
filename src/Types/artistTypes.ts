export interface ArtistImage {
  url: string;
  height?: number;
  width?: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface TopArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: ArtistImage[];
  external_urls: ExternalUrls;
}
export interface FollowedArtistsResponse {
  followedArtists: FollowedArtistsData;
}

export interface FollowedArtistsData {
  total: number;
  items: TopArtist[];
}
