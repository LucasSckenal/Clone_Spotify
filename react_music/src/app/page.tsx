import styles from "./page.module.css";
import HomePage from "./Components/Home/Home";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage />
    </main>
  );
}
