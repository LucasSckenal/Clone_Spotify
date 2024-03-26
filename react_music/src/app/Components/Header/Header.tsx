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
    <header className={styles.header}>
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
            <Image src="/images/fotominha.jpeg" alt="" width={30} height={30} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
