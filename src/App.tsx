import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import { TopSongs } from "./Pages/TopSongs";
import TopArtists from "./Pages/TopArtists";
import { AuthCallback } from "./Pages/AuthCallback";
import { PrivateRoute } from "./components/PrivateRoute";
import { SpotifyPlayerProvider } from "./context/SpotifyPlayerContext";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState<string | null>(null);

  // Utility to get a cookie
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  // Fetch token from localStorage or cookie
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");

    if (storedToken) {
      setToken(storedToken);
    } else {
      const cookieToken = getCookie("spotify_access_token");
      if (cookieToken) {
        localStorage.setItem("spotify_access_token", cookieToken);
        setToken(cookieToken);
      }
    }
  }, []);

  return (
    <SpotifyPlayerProvider token={token}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/topArtists"
              element={
                <PrivateRoute>
                  <TopArtists />
                </PrivateRoute>
              }
            />
            <Route
              path="/topSongs"
              element={
                <PrivateRoute>
                  <TopSongs />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </SpotifyPlayerProvider>
  );
}

export default App;
