import styles from "./styles.module.scss";
import { SlArrowLeft, SlArrowRight, SlArrowDown } from "react-icons/sl";
import Image from "next/image";
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
        </div>
      </section>
    </div>
  );
};

export default Center;
