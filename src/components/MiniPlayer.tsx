import React, { useState } from "react";
import { useSpotifyPlayer } from "../context/SpotifyPlayerContext";
import { ChevronUp, ChevronDown } from "lucide-react";
import { FaPlay, FaPause } from "react-icons/fa";

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    pause,
    resume,
    position,
    duration,
    seekTo,
    isPaused,
  } = useSpotifyPlayer();

  const [expanded, setExpanded] = useState(false);

  if (!currentTrack) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 bg-[#121212] rounded-2xl text-white shadow-xl transition-all duration-300 z-50 overflow-hidden border border-neutral-700 ${
        expanded ? "w-80 h-[430px]" : "w-72 h-20"
      }`}
    >
      {/* Chevron Button */}
      <div className="absolute right-2 top-2">
        <button
          className="text-white/80 hover:text-green-400 transition"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>

      {/* Collapsed View */}
      {!expanded && (
        <div className="flex items-center h-full px-4 gap-3 pr-10">
          <img
            src={currentTrack.album.images[0]?.url}
            alt="cover"
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{currentTrack.name}</p>
            <p className="text-xs text-neutral-400 truncate">
              {currentTrack.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
          <button
            onClick={isPaused ? resume : pause}
            className="text-white text-lg ml-2 hover:text-green-400 transition"
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>
        </div>
      )}

      {/* Expanded View */}
      {expanded && (
        <div className="p-4 flex flex-col h-full justify-between pt-6">
          {/* Album Art */}
          <img
            src={currentTrack.album.images[0]?.url}
            alt="cover"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />

          {/* Track Info */}
          <div>
            <p className="text-base font-semibold truncate">
              {currentTrack.name}
            </p>
            <p className="text-sm text-neutral-400 truncate">
              {currentTrack.artists.map((a) => a.name).join(", ")}
            </p>
          </div>

          {/* Seek Bar */}
          <div className="mt-3">
            <input
              type="range"
              min={0}
              max={duration}
              value={position}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="text-xs flex justify-between mt-1 text-neutral-400">
              <span>{formatTime(position)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={isPaused ? resume : pause}
              className="flex items-center justify-center bg-green-500 hover:bg-green-400 transition text-white rounded-full w-14 h-14 shadow-md text-2xl"
            >
              {isPaused ? <FaPlay className="ml-[2px]" /> : <FaPause />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
