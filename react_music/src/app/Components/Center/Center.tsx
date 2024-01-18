import styles from "./styles.module.scss";

const Center = () => {
  return (
    <div className={styles.backG}>
      <section className={styles.container}>
        <div className={styles.onTopBtn}>
          <div>
            <button>seta esquerda</button>
            <button>seta direita</button>
          </div>
          <div>
            <button className={styles.btnUser}>Foto e nome do usuario</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Center;
