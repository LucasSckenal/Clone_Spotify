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
                alt="Home"
                width={26}
                height={26}
              />
            </li>
          </Link>
          <Link href="/search">
            <li>
              <Image
                src="/images/search.svg"
                alt="Search"
                width={26}
                height={26}
              />
            </li>
          </Link>
        </ul>
        <ul>
          <Link href="/library">
            <li>
              <Image
                src="/images/library.svg"
                alt="Expand Your Library"
                width={26}
                height={26}
              />
            </li>
          </Link>
          <li></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
