// Source - https://stackoverflow.com/a/77723462
// Posted by Jonathan
// Retrieved 2025-11-30, License - CC BY-SA 4.0

import React, { useRef, useEffect } from "react";

export default function AudioPlayer(props) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (props.play) {
      playAudio();
    }
  }, [props.play]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleAudioEnded = () => {
    // Call the callback function when the audio ends
    if (props.onFinish) {
      props.onFinish();
    }
  };

  return (
    <div>
      <audio ref={audioRef} controls className="hidden" onEnded={handleAudioEnded}>
        <source src={props.src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

