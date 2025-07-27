import type { FollowedArtistsData } from "../Types/artistTypes";
import { capitalizeWords } from "../Helpers/Helpers";
interface FollowedArtistsProps {
  stats: FollowedArtistsData;
}

export function FollowedArtistsStatCard({ stats }: FollowedArtistsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 ">
      <div className="flex flex-col bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg h-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2">
            🎧 Followed Artists
          </h2>
          <p className="text-gray-400 text-sm">
            You follow {stats.total} artist{stats.total !== 1 && "s"}
          </p>
        </div>

        {/* Scrollable area with fixed height */}
        <div
          className="space-y-6 overflow-y-auto custom-scrollbar pr-2"
          style={{ maxHeight: "600px" }}
        >
          {stats.items.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 p-4  transition-shadow duration-300 hover:shadow-lg hover:shadow-green-400/10 rounded-xl"
            >
              <img
                src={artist.images?.[1]?.url || artist.images?.[0]?.url}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-white font-bold text-lg">{artist.name}</p>
                <p className="text-gray-400 text-sm">
                  {artist.genres.length > 0
                    ? capitalizeWords(artist.genres.join(" "))
                    : "No genres available"}
                </p>
                <p className="text-sm text-green-400">
                  Popularity: {artist.popularity}
                </p>
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-sm hover:underline"
                >
                  Open on Spotify ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
