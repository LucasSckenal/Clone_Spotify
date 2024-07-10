import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  duration: number;
  currentTime: number;
  onTimeChange: (value: number) => void;
}

function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  duration,
  currentTime,
  onTimeChange,
}: PlayerControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const [progress, setProgress] = useState<number>(
    (currentTime / duration) * 100
  );

  const handleAudioProgressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProgress = Number(e.target.value);
    const newCurrentTime = (newProgress / 100) * duration;
    onTimeChange(newCurrentTime);
  };

  useEffect(() => {
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
  }, [currentTime, duration]);

  return (
    <div className={styles.controls}>
      <div className={styles.player_controls}>
        <button onClick={onPrevious}>
          <Image
            src="/images/prev.svg"
            alt="prev music"
            width={32}
            height={32}
          />
        </button>
        <button onClick={onPlayPause}>
          {isPlaying ? (
            <Image
              src="/images/stop.svg"
              alt="stop music"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/images/play.svg"
              alt="play music"
              width={32}
              height={32}
            />
          )}
        </button>
        <button onClick={onNext}>
          <Image
            src="/images/next.svg"
            alt="next music"
            width={32}
            height={32}
          />
        </button>
      </div>
      <div className={styles.musicTimer}>
        <span>{formatTime(currentTime)}</span>
        <div className={styles.progressBarContainer}>
          <input
            className={styles.progressBar}
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleAudioProgressChange}
          />
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default PlayerControls;
