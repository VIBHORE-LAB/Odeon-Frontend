export const loadSpotifyPlayerSDK = () => {
  return new Promise<void>((resolve) => {
    const existingScript = document.getElementById("spotify-sdk");

    if (existingScript) {
      // SDK already loaded, resolve immediately
      resolve();
      return;
    }

    // Must define the global callback BEFORE script loads
    window.onSpotifyWebPlaybackSDKReady = () => {
      resolve();
    };

    const script = document.createElement("script");
    script.id = "spotify-sdk";
    script.src = "https://sdk.scdn.co/spotify-player.js"; // ✅ CORRECT URL
    script.async = true;

    document.body.appendChild(script);
  });
};
