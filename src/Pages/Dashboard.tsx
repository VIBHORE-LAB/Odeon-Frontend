import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GENRE_STATS } from "../graphql/genreStats";
import { GET_USER_STATS } from "../graphql/userStats";
import type { GenreStat } from "../Types/genreTypes";
import GenrePieChart from "../components/GenrePieChart";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import type { UserStats } from "../Types/userStatsTypes";
import { PlayBackStatCard } from "../components/PlaybackStatCard";
import { Loader } from "../components/Loader";

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState("medium_term");

  const {
    data: genreStatsData,
    loading: genreLoading,
    error: genreError,
    refetch,
  } = useQuery<{ genreStats: GenreStat[] }>(GET_GENRE_STATS, {
    variables: { limit: 20, timeRange },
  });

  const {
    data: playbackStatsData,
    loading: playbackLoading,
    error: playbackError,
  } = useQuery<{ userStats: UserStats }>(GET_USER_STATS, {
    variables: { year: 2025 },
  });

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
    refetch({ limit: 10, timeRange: range });
  };

  if (genreError || playbackError) {
    return <p>Error: {(genreError || playbackError)?.message}</p>;
  }

  return (
    <div className="p-6">
      {/* Time Range Selector */}
      <div className="mb-6">
        <TimeRangeSelector selected={timeRange} onChange={handleRangeChange} />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 ml-10 items-stretch">
        {/* Genre Pie Chart */}
        <div className="lg:col-span-2 h-full">
          {genreLoading ? (
            <Loader loading={true} />
          ) : (
            <div className="h-full flex flex-col">
              <GenrePieChart
                className="bg-gradient-card border-border shadow-card h-full"
                data={genreStatsData?.genreStats ?? []}
              />
            </div>
          )}
        </div>

        {/* Playback Stats */}
        <div className="h-full">
          {playbackLoading ? (
            <Loader loading={true} />
          ) : (
            playbackStatsData?.userStats && (
              <div className="h-full flex flex-col">
                <PlayBackStatCard stats={playbackStatsData.userStats} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
