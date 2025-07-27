import type { ReactNode } from "react";
import { Sidebar } from "./SideBar";
import { useSpotifyPlayer } from "../context/SpotifyPlayerContext";
import { MiniPlayer } from "../components/MiniPlayer";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { currentTrack } = useSpotifyPlayer(); // get track info

  return (
    <div className="min-h-screen flex flex-col relative">
      <Sidebar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>

      {currentTrack && (
        <div className="fixed bottom-4 right-4 z-50">
          <MiniPlayer />
        </div>
      )}
    </div>
  );
};
