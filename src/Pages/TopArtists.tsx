import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_ARTISTS } from "../graphql/topArtists";
import TopArtistCard from "../components/TopArtistsCard";
import type { TopArtist } from "../Types/artistTypes";
import { Loader } from "../components/Loader";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import LimitSlider from "../components/Slider";

const TopArtists: React.FC = () => {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [limit, setLimit] = useState(10);
  const [debouncedLimit, setDebouncedLimit] = useState(limit);

  const { data, loading, error, refetch } = useQuery<{
    topArtists: TopArtist[];
  }>(GET_TOP_ARTISTS, {
    variables: { limit: debouncedLimit, timeRange },
  });

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLimit(limit);
    }, 500);

    return () => clearTimeout(handler);
  }, [limit]);

  useEffect(() => {
    refetch({ limit: debouncedLimit, timeRange });
  }, [debouncedLimit, timeRange, refetch]);

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-16 pt-6">
      <div className="mb-6 flex items-center justify-between gap-6">
        {/* Left spacer */}
        <div className="w-1/3" />

        {/* Centered TimeRangeSelector */}
        <div className="w-1/3 flex justify-center">
          <TimeRangeSelector
            selected={timeRange}
            onChange={handleRangeChange}
          />
        </div>

        {/* Right-aligned LimitSlider */}
        <div className="w-1/3 flex justify-end">
          <LimitSlider limit={limit} setLimit={setLimit} />
        </div>
      </div>

      <Loader loading={loading} message="Fetching Your Top Artists...">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.topArtists.map((artist: TopArtist) => (
            <TopArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </Loader>
    </div>
  );
};

export default TopArtists;
