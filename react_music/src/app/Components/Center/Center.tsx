"use client";
import styles from "./styles.module.scss";
import { SlArrowLeft, SlArrowRight, SlArrowDown, SlPlus } from "react-icons/sl";
import Image from "next/image";
import UploadFile from "@/app/Components/Modals/AddMusic/addMusic";
import { useState } from "react";
const Center = () => {
  const [btnAddMusic, setBtnAddMusic] = useState<boolean>(false);

  const toogleBtn = () => {
    setBtnAddMusic((prevState) => !prevState);
  };

  return (
    <div className={styles.backG}>
      <section className={styles.container}>
        <div className={styles.onTopBtn}>
          <div className={styles.arrows}>
            <button className={styles.btnAling}>
              <SlArrowLeft />
            </button>
            <button className={styles.btnAling}>
              <SlArrowRight />
            </button>
          </div>
          <div>
            <button className={styles.btnUser}>
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
            </button>
          </div>

          <button className={styles.btnAling} onClick={toogleBtn}>
            {btnAddMusic ? (
              <SlPlus style={{ color: "var(--BtnGreen)" }} />
            ) : (
              <SlPlus />
            )}
          </button>
          {btnAddMusic && <UploadFile />}
        </div>
      </section>
    </div>
  );
};

export default Center;
