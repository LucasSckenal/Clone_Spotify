import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.sass";

const Sidebar = () => {
  return (
    <aside className={styles.bg}>
      <nav>
        <ul>
          <Link href="/">
            <li>
              <Image
                src="/images/home-fill.svg"
                alt=""
                width={26}
                height={26}
              />
              Home
            </li>
          </Link>
          <Link href="/search">
            <li>
              <Image src="/images/search.svg" alt="" width={26} height={26} />
              Search
            </li>
          </Link>
          <Link href="/library">
            <li>
              <Image src="/images/library.svg" alt="" width={26} height={26} />
              Your Library
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
