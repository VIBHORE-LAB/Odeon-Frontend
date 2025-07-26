import type { Track } from "../Types/trackTypes";

export const TrackCard = ({ track }: { track: Track }) => (
  <div className="bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-green-500/30 hover:-translate-y-1 hover:scale-105 relative group">
    {/* Album Image */}
    <div className="overflow-hidden rounded-xl w-full">
      <img
        src={track.album.images?.[0]?.url || "/placeholder.png"}
        alt={track.name}
        className="w-full h-48 rounded-xl object-cover transform group-hover:scale-110 transition-transform duration-300"
      />
    </div>

    {/* Track Info */}
    <h2 className="text-lg font-bold text-green-400 text-center line-clamp-1">
      {track.name}
    </h2>
    <p className="text-sm text-gray-300 text-center line-clamp-1">
      {track.artists.join(", ")}
    </p>

    {/* Album Details */}
    <div className="text-xs text-gray-400 text-center space-y-1">
      <p>
        <span className="font-semibold text-white">Album:</span>{" "}
        {track.album.name}
      </p>
      <p>
        <span className="font-semibold text-white">Type:</span>{" "}
        {track.album.album_type}
      </p>
      <p>
        <span className="font-semibold text-white">Released:</span>{" "}
        {track.album.release_date}
      </p>
    </div>

    {/* Spotify Link */}
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-block text-sm font-semibold text-black bg-green-400 px-3 py-1.5 rounded-full shadow-md hover:bg-green-500 transition-colors duration-300"
    >
      Open on Spotify
    </a>
  </div>
);
