"use client";
import React, { useState, useRef } from "react";
import MusicPlayer from "../MusicsPlayer/MusicPlayer";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import styles from "./styles.module.scss";
import Image from "next/image";

const songs = [
  "/music/vou falar que não quero.mp3",
  "/music/cartola.mp3",
  "/music/FalseAlarm.mp3",
];

const Footer = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFav = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.musicInfo}>
        <Image src="/images/teste.jpg" alt="Music Img" width={72} height={72} />
        <div className={styles.info}>
          <h2>Title</h2>
          <div>
            <p>Artista</p>
            <button onClick={handleFav}>
              {isFavorite ? <FaHeart /> : <FiHeart />}
            </button>
          </div>
        </div>
      </div>
      <div>
        <MusicPlayer songs={songs} audioRef={audioRef} />
      </div>
      <div className={styles.secondInfo}>
        <Image src="/images/queue-xs.svg" alt="fila" width={32} height={32} />
        <Image
          src="/images/devices-xs.svg"
          alt="dispositivos"
          width={32}
          height={32}
        />
        <Image
          src="/images/volume-xs.svg"
          alt="volume"
          width={32}
          height={32}
        />
        <input
          type="range"
          name="volume"
          value={volume * 100}
          min={0}
          max={100}
          onChange={handleVolumeChange}
        />
      </div>
    </footer>
  );
};

export default Footer;
