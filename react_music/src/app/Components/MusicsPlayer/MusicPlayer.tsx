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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentSong = songs[currentSongIndex];

  const handleTimeChange = (value: number) => {
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

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

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        setCurrentTime(audioRef.current!.currentTime);
        setDuration(audioRef.current!.duration);
        setProgress(
          (audioRef.current!.currentTime / audioRef.current!.duration) * 100
        );
      };

      const interval = setInterval(updateProgress, 1000);
      audioRef.current.addEventListener("timeupdate", updateProgress);

      return () => {
        clearInterval(interval);
        audioRef.current?.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  return (
    <div>
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={playPause}
        onNext={nextSong}
        onPrevious={previousSong}
        duration={duration}
        currentTime={currentTime}
        onTimeChange={handleTimeChange}
      />
      <audio ref={audioRef} />
    </div>
  );
}

export default MusicPlayer;
