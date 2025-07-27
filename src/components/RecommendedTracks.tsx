// components/RecommendedTracks.tsx
import React from "react";
import { PlayCircle } from "lucide-react";
import type { RandomTrack } from "../Types/randomTracks";
import { useSpotifyPlayer } from "../context/SpotifyPlayerContext";

type Props = {
  tracks: RandomTrack[];
};

export const RecommendedTracks: React.FC<Props> = ({ tracks }) => {
  const { play } = useSpotifyPlayer();

  const handlePlayTrack = (id: string) => {
    const uri = `spotify:track:${id}`;
    play(uri); // Trigger playback
  };

  return (
    <div className="w-full mx-auto px-4 overflow-x-hidden">
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
          🎵 Recommended Tracks
        </h2>

        <div
          className="space-y-6 overflow-y-auto custom-scrollbar pr-2"
          style={{ maxHeight: "80vh" }}
        >
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-start gap-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-green-400/10 rounded-xl cursor-pointer group"
              onClick={() => handlePlayTrack(track.id)}
              // click triggers playback
            >
              <div className="relative min-w-[96px] max-w-[96px]">
                <img
                  src={track.album.imageUrl ?? ""}
                  alt={track.name}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="text-green-500 h-10 w-10" />
                </div>
              </div>

              <div className="flex-1 break-words overflow-x-hidden">
                <h3 className="text-white font-bold text-lg">{track.name}</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {track.artists.map((a) => a.name).join(", ")}
                </p>
                <p className="text-sm text-gray-500 mt-1">{track.album.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
