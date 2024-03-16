import styles from "./styles.module.scss";
import Image from "next/image";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  duration: number;
  currentTime: number;
  onTimeChange: (value: any) => void;
}

function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  duration,
  currentTime,
}: PlayerControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const progress = (currentTime / duration) * 100;

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
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            style={{ width: `${duration}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default PlayerControls;
