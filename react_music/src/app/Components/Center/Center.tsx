import styles from "./styles.module.scss";
import { SlArrowLeft, SlArrowRight, SlArrowDown, SlPlus } from "react-icons/sl";
import Image from "next/image";
import UploadFile from "@/app/Components/Modals/AddMusic/addMusic";
const Center = () => {
  return (
    <div className={styles.backG}>
      <section className={styles.container}>
        <div className={styles.onTopBtn}>
          <div className={styles.arrows}>
            <button>
              <SlArrowLeft />
            </button>
            <button>
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
          <UploadFile />
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SlPlus />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Center;
