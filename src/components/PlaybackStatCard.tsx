import type { UserStats } from "../Types/userStatsTypes";
import { mapUserStatsToPlaybackStats } from "../Helpers/Helpers";

interface PlaybackInsightsProps {
  stats: UserStats;
}

export function PlayBackStatCard({ stats }: PlaybackInsightsProps) {
  const playbackStats = mapUserStatsToPlaybackStats(stats);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2">
            📈 Playback Insights for this year
          </h2>
          <p className="text-gray-400 text-sm">Your listening behavior</p>
        </div>

        <div className="space-y-4">
          {playbackStats.map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-400">{stat.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-lg font-bold">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
