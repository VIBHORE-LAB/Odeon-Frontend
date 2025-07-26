import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existingAccess = localStorage.getItem("spotify_access_token");
    const existingRefresh = localStorage.getItem("spotify_refresh_token");

    if (existingAccess && existingRefresh) {
      navigate("/dashboard");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");


    if (access && refresh) {
      localStorage.setItem("spotify_access_token", access);
      localStorage.setItem("spotify_refresh_token", refresh);
      console.log("Tokens saved, navigating to /dashboard");
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <p>Authenticating with Spotify...</p>;
};
