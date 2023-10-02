import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.sass"

const Sidebar = () => {
  return (
    <aside className={styles.bg}>
      <nav>
        <ul>
          <li>
            <Link href="/" />
            Home
          </li>
          <li>
            <Link href="/search" />
            Search
          </li>
          <li>
            <Image src="/images/library.svg" alt="" width={26} height={26} />
            <Link href="/library" />
            Your Library
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
