import { useEffect, useRef, useState } from "react";

export default function AudioController({audioRef}) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {
      // Autoplay might fail; wait for user interaction
    });
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sounds/theme.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 bg-black/60 text-white px-3 py-1 rounded shadow-md z-50"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
}
