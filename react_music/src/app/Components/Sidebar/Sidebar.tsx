"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.sass";
import { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`${styles.bg} ${isSidebarOpen ? styles.open : ""}`}>
      <nav>
        <ul className={isSidebarOpen ? styles.open : ""}>
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
        <div
          className={`${styles.libraryContainer} ${
            isSidebarOpen ? styles.open : ""
          }`}
        >
          <div className={styles.library}>
            <Image
              src="/images/library.svg"
              alt="Expand Your Library"
              width={26}
              height={26}
              onClick={toggleSidebar}
            />
          </div>
          <li></li>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
