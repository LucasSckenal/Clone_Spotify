"use client";
import styles from "./styles.module.scss";
const FadeBg = ({ children }: any) => {
  return <div className={styles.backG}>{children}</div>;
};

export default FadeBg;
