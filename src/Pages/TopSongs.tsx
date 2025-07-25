import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_TRACKS } from "../graphql/topTracks";
import { TrackCard } from "../components/TrackCard";
import type { Track } from "../Types/trackTypes";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import { Loader } from "../components/Loader";
export const TopSongs = () => {
  const [timeRange, setTimeRange] = useState("medium_term");

  const { data, loading, error, refetch } = useQuery<{ topTracks: Track[] }>(
    GET_TOP_TRACKS,
    {
      variables: { limit: 10, timeRange },
    }
  );

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
    refetch({ limit: 10, timeRange: range });
  };

  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-16 pt-6">
      <div className="mb-6">
        <TimeRangeSelector selected={timeRange} onChange={handleRangeChange} />
      </div>
      <Loader loading={loading} message="Loading your top songs..." />

      <div className="p-6 grid grid-cols-1 bg-gray-900 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.topTracks.map((track, index) => (
          <TrackCard key={track.id || index} track={track} />
        ))}
      </div>
    </div>
  );
};
