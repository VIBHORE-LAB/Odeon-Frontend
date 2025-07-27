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
import { PlaylistStatCard } from "../components/PlaylistsStatCard";
import { GET_PLAYLISTS_STATS } from "../graphql/playlistsStats";
import type { PlayList } from "../Types/PlayListTypes";
import type { FollowedArtistsData } from "../Types/artistTypes";
import { GET_FOLLOWED_ARTISTS } from "../graphql/followedArtists";
import { FollowedArtistsStatCard } from "../components/FollowedArtistsFollowedArtistsStatCard";
import { GET_RANDOM_TRACKS } from "../graphql/recommendedTracks";
import type { RandomTrack } from "../Types/randomTracks";
import { RecommendedTracks } from "../components/RecommendedTracks";

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

  const {
    data: playlistsStatsData,
    loading: playListLoading,
    error: playListError,
  } = useQuery<{ playlistsStats: PlayList[] }>(GET_PLAYLISTS_STATS, {
    variables: { offset: 0 },
  });

  const {
    data: followedArtistsStatsData,
    loading: followedArtistsLoading,
    error: followedArtistsError,
  } = useQuery<{ followedArtists: FollowedArtistsData }>(GET_FOLLOWED_ARTISTS, {
    variables: { limit: 50 },
  });

  const {
    data: randomTracksData,
    loading: randomTracksLoading,
    error: randomTracksError,
  } = useQuery<{ randomRecommendedTracks: RandomTrack[] }>(GET_RANDOM_TRACKS);

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
    refetch({ limit: 10, timeRange: range });
  };

  if (
    genreError ||
    playbackError ||
    playListError ||
    followedArtistsError ||
    randomTracksError
  ) {
    return (
      <p>
        Error:{" "}
        {
          (
            genreError ||
            playbackError ||
            playListError ||
            followedArtistsError ||
            randomTracksError
          )?.message
        }
      </p>
    );
  }

  return (
    <div className="p-6">
      {/* Time Range Selector */}
      <div className="mb-6">
        <TimeRangeSelector selected={timeRange} onChange={handleRangeChange} />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 ml-10 items-stretch">
        <div className="lg:col-span-2 h-full">
          {genreLoading ? (
            <Loader loading={true} />
          ) : (
            <GenrePieChart
              className="bg-gradient-card border-border shadow-card h-full"
              data={genreStatsData?.genreStats ?? []}
            />
          )}
        </div>

        <div className="h-full">
          {playbackLoading ? (
            <Loader loading={true} />
          ) : (
            playbackStatsData?.userStats && (
              <PlayBackStatCard stats={playbackStatsData.userStats} />
            )
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ml-10">
        {/* Playlist Stats */}
        <div className="w-full rounded-xl shadow p-4">
          {playListLoading ? (
            <Loader loading={true} />
          ) : (
            playlistsStatsData?.playlistsStats && (
              <PlaylistStatCard playlists={playlistsStatsData.playlistsStats} />
            )
          )}
        </div>

        {/* Followed Artists */}
        <div className="w-full rounded-xl shadow p-4">
          {followedArtistsLoading ? (
            <Loader loading={true} />
          ) : followedArtistsStatsData?.followedArtists ? (
            <FollowedArtistsStatCard
              stats={followedArtistsStatsData.followedArtists}
            />
          ) : null}
        </div>

        {/* Recommended Tracks */}
        <div className="w-full rounded-xl shadow p-4">
          {randomTracksLoading ? (
            <Loader loading={true} />
          ) : (
            randomTracksData && (
              <RecommendedTracks
                tracks={randomTracksData.randomRecommendedTracks}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
