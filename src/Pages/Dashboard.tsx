import { useQuery } from "@apollo/client";
import { GET_TOP_TRACKS } from "../graphql/topTracks";
import { TrackCard } from "../components/TrackCard";
import type { Track } from "../Types/trackTypes";
export const Dashboard = () => {
  const { data, loading, error } = useQuery<{ topTracks: Track[] }>(GET_TOP_TRACKS);

  if (loading) return <p className="text-center mt-10">Loading tracks...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.topTracks.map((track, index) => (
        <TrackCard key={track.id || index} track={track} />
      ))}
    </div>
  );
};
