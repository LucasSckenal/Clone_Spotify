import styles from "./styles.module.scss";
import Image from "next/image";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: PlayerControlsProps) {
  return (
    <div className={styles.player_controls}>
      <button onClick={onPrevious}>
        <Image src="/images/prev.svg" alt="prev music" width={32} height={32} />
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
        <Image src="/images/next.svg" alt="next music" width={32} height={32} />
      </button>
    </div>
  );
}

export default PlayerControls;
