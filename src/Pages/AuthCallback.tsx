import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (access && refresh) {
      localStorage.setItem("spotify_access_token", access);
      localStorage.setItem("spotify_refresh_token", refresh);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <p>Authenticating with Spotify...</p>;
};
