import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_ARTISTS } from "../graphql/topArtists";
import TopArtistCard from "../components/TopArtistsCard";
import type { TopArtist } from "../Types/artistTypes";
import { Loader } from "../components/Loader";
import { TimeRangeSelector } from "../components/TimeRangeSelector";

const TopArtists: React.FC = () => {
  const [timeRange, setTimeRange] = useState("medium_term");

  const { data, loading, error, refetch } = useQuery<{
    topArtists: TopArtist[];
  }>(GET_TOP_ARTISTS, {
    variables: { limit: 10, timeRange },
  });

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
    refetch({ limit: 10, timeRange: range });
  };

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-16 pt-6">
      <div className="mb-6">
        <TimeRangeSelector selected={timeRange} onChange={handleRangeChange} />
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
