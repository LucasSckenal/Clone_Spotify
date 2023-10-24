"use client";
import { useState, useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls/PlayerControls";

interface MusicPlayerProps {
  songs: string[];
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

function MusicPlayer({ songs, audioRef }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentSongIndex];

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const previousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  return (
    <div>
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={playPause}
        onNext={nextSong}
        onPrevious={previousSong}
      />

      <audio ref={audioRef} />
    </div>
  );
}

export default MusicPlayer;
