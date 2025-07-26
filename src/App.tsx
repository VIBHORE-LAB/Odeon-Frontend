import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import { TopSongs } from "./Pages/TopSongs";
import TopArtists from "./Pages/TopArtists";
import { AuthCallback } from "./Pages/AuthCallback";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
function App() {
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  useEffect(() => {
    const token = getCookie("spotify_access_token");
    if (token) {
      localStorage.setItem("spotify_access_   token", token);
    }
  }, []);

  return (
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
            path="topSongs"
            element={
              <PrivateRoute>
                <TopSongs />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
