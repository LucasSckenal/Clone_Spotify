"use client";
import styles from "./styles.module.scss";
import { SlArrowLeft, SlArrowRight, SlArrowDown } from "react-icons/sl";
import Image from "next/image";
import { useState } from "react";
const Header = () => {
  
  const [openUser, setOpenUser] = useState();

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

          <button className={styles.btnUser}>
            <Image src="/images/fotominha.jpeg" alt="" width={30} height={30} />
            <p>Nome da pessoa</p>
            <span>
              <SlArrowDown />
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
