/// <reference types="spotify-web-playback-sdk" />

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { loadSpotifyPlayerSDK } from "../utils/loadSpotifyPlayer";
import { refreshAccessToken } from "../utils/refreshaccessToken";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;
  }
}

interface SpotifyPlayerContextType {
  play: (uri: string) => void;
  pause: () => void;
  resume: () => void;
  deviceId: string | null;
  isReady: boolean;
  currentTrack: Spotify.Track | null;
  position: number;
  duration: number;
  volume: number;
  setVolume: (val: number) => void;
  seekTo: (pos: number) => void;
  isPaused: boolean;
}

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | null>(
  null,
);

export const useSpotifyPlayer = () => {
  const context = useContext(SpotifyPlayerContext);
  if (!context) throw new Error("SpotifyPlayerContext not available");
  return context;
};

export const SpotifyPlayerProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isPaused, setIsPaused] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const getValidToken = async (): Promise<string | null> => {
    console.log("🔐 Getting valid token");

    const token = localStorage.getItem("spotify_access_token");
    const expiresAt = localStorage.getItem("spotify_expires_at");

    const isExpired = !expiresAt || Date.now() > Number(expiresAt);

    if (!token || isExpired) {
      console.log("⚠️ Token missing or expired, refreshing...");
      await refreshAccessToken();
      const newToken = localStorage.getItem("spotify_access_token");
      return newToken;
    }

    console.log("✅ Token is valid");
    return token;
  };

  useEffect(() => {
    if (!token) {
      console.warn("Waiting for Spotify token...");
      return;
    }

    loadSpotifyPlayerSDK().then(() => {
      const newPlayer = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: async (cb) => {
          const t = await getValidToken();
          if (t) {
            cb(t);
          } else {
            console.error("Token missing during getOAuthToken");
          }
        },

        volume: volume,
      });

      newPlayer.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        setIsReady(true);
        console.log("Spotify player ready with device ID:", device_id);
      });

      newPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setPosition(state.position);
        setDuration(state.duration);
        setIsPaused(state.paused);
      });

      newPlayer.connect().then((success) => {
        if (success) {
          console.log("Connected to Spotify Player");
        } else {
          console.error("Failed to connect Spotify Player");
        }
      });

      setPlayer(newPlayer);
    });
  }, [token]);

  // Progress updater
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setPosition((prev) => {
          if (prev + 1000 < duration) return prev + 1000;
          return prev;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, duration]);

  const play = async (uri: string) => {
    if (!deviceId) return;

    let accessToken = await getValidToken();
    if (!accessToken) return;

    const res = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 401) {
      await refreshAccessToken();
      accessToken = localStorage.getItem("spotify_access_token");
      if (!accessToken) return;

      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [uri] }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
    }
  };

  const pause = () => player?.pause();
  const resume = () => player?.resume();

  const setVolume = (val: number) => {
    setVolumeState(val);
    player?.setVolume(val);
  };

  const seekTo = (pos: number) => {
    player?.seek(pos);
    setPosition(pos);
  };

  return (
    <SpotifyPlayerContext.Provider
      value={{
        play,
        pause,
        resume,
        deviceId,
        isReady,
        currentTrack,
        position,
        duration,
        volume,
        setVolume,
        seekTo,
        isPaused,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
};
