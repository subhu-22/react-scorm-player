// src/Components/VideoJsScorm.jsx
import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoJsScorm({ src, courseId }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    playerRef.current = videojs(videoEl, { controls: true, autoplay: false, preload: "auto" });

    const player = playerRef.current;
    let lastSaved = 0;

    const maybeSave = () => {
      const now = Date.now();
      if (now - lastSaved < 5000) return;
      lastSaved = now;
      const pos = Math.floor(player.currentTime());
      if (window.API_1484_11?.SetValue) {
        window.API_1484_11.SetValue("cmi.location", String(pos));
      }
    };

    const onEnded = () => {
      if (window.API_1484_11?.SetValue) {
        window.API_1484_11.SetValue("cmi.completion_status", "completed");
        window.API_1484_11.SetValue("cmi.success_status", "passed");
        // commit if available
        window.API_1484_11.Commit && window.API_1484_11.Commit();
      }
    };

    player.on("timeupdate", maybeSave);
    player.on("ended", onEnded);

    return () => {
      if (player) {
        player.off("timeupdate", maybeSave);
        player.off("ended", onEnded);
        player.dispose();
      }
    };
  }, [src, courseId]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" controls preload="auto">
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default VideoJsScorm;
