import React from "react";
import type { PlayList } from "../Types/PlayListTypes";

interface PlaylistsProps {
  playlists: PlayList[];
}

export const PlaylistStatCard: React.FC<PlaylistsProps> = ({ playlists }) => {
  const topFive = [...playlists]
    .sort((a, b) => b.totalTracks - a.totalTracks)
    .slice(0, 5);

  return (
    <div className="w-full h-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col justify-between h-full bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2">
              🎧 Top 5 Playlists by Track Count
            </h2>
          </div>

          <div
            className="space-y-6 overflow-x-clip overflow-y-auto custom-scrollbar pr-2"
            style={{ maxHeight: "600px" }} 
          >
            {topFive.map((playlist) => (
              <div
                key={playlist.id}
                className="flex flex-col md:flex-row gap-4 items-center md:items-start transition-shadow duration-300 hover:shadow-lg hover:shadow-green-400/10 rounded-xl"
              >
                <img
                  src={playlist.images[0]?.url}
                  alt={playlist.name}
                  className="w-48 h-48 object-cover rounded-xl shadow-md"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-xl  font-semibold text-white mb-1">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-1">
                    👤 {playlist.owner}
                  </p>
                  <p className="text-sm text-zinc-300 mb-2">
                    🎵 {playlist.totalTracks} tracks
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500 text-black rounded-full">
                    {playlist.public ? "Public" : "Private"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1db95410;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #1db954;
            border-radius: 9999px;
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #1db954 #1db95410;
          }
        `}
      </style>
    </div>
  );
};
