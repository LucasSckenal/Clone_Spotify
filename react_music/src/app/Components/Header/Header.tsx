"use client";
import styles from "./styles.module.scss";
import { SlArrowLeft, SlArrowRight, SlArrowDown } from "react-icons/sl";
import Image from "next/image";
import { useState } from "react";
const Header = () => {
  const [openUser, setOpenUser] = useState<boolean>(false);

  const toggleUser = (): void => {
    setOpenUser(!openUser);
  };

  return (
    <div className={styles.backG}>
      <header>
        <div className={styles.onTopBtn}>
          <div className={styles.arrows}>
            <button>
              <SlArrowLeft />
            </button>
            <button>
              <SlArrowRight />
            </button>
          </div>
          <button
            onClick={toggleUser}
            className={`${styles.btnUser} ${openUser ? styles.open : ""}`}
          >
            <div>
              {/* foto do usuário */}
              <Image
                src="/images/fotominha.jpeg"
                alt=""
                width={30}
                height={30}
              />
              <p>Nome da pessoa</p>
              <span>
                <SlArrowDown />
              </span>
            </div>
          </button>
        </div>
      </header>

      <div className={styles.info}>
        {/* foto da playlist */}
        <Image src="/images/fotoPlaylist.jpg" alt="" width={200} height={200} />
        <div className={styles.infoText}>
          <p>PLAYLIST</p>
          <h1>Titulo da Playlist</h1>
          <div>
            {/* foto do usuário */}
            <Image src="/images/fotominha.jpeg" alt="" width={35} height={35} />
            <p>Nome da pessoa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
