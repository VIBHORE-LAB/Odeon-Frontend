import React from "react";
import type { TopArtist } from "../Types/artistTypes";
import { capitalizeWords } from "../Helpers/Helpers";

interface TopArtistCardProps {
  artist: TopArtist;
}

const TopArtistCard: React.FC<TopArtistCardProps> = ({ artist }) => {
  return (
    <div className=" ml-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl p-4 text-center shadow-md hover:shadow-green-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative group">
      {/* Artist Image */}
      {artist.images?.[0] && (
        <div className="overflow-hidden rounded-xl mb-3 aspect-[4/3]">
          <img
            src={artist.images[0].url}
            alt={artist.name}
            className="w-full h-full object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      <h3 className="text-lg font-bold text-green-400 truncate">
        {artist.name}
      </h3>

      {artist.genres.length > 0 && (
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {capitalizeWords(artist.genres.join(", "))}
        </p>
      )}

      {/* Spotify Link */}
      <a
        href={artist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-black bg-green-400 px-3 py-1.5 rounded-full shadow-md hover:bg-green-500 transition-colors duration-300"
      >
        Open on Spotify
      </a>
    </div>
  );
};

export default TopArtistCard;
