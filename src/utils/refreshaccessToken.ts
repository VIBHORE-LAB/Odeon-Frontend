export const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem("spotify_refresh_token");
    if (!refresh_token) {
      console.error("No refresh token available in localStorage");
      return;
    }

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(
      `${baseUrl}/refresh-token?refresh_token=${refresh_token}`,
    );

    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("spotify_access_token", data.access_token);
      const expiresAt = Date.now() + data.expires_in * 1000;
      localStorage.setItem("spotify_expires_at", String(expiresAt));
      console.log("✅ Spotify access token refreshed");
    } else {
      console.error("Failed to refresh access token", data);
    }
  } catch (err) {
    console.error("Error refreshing access token", err);
  }
};
