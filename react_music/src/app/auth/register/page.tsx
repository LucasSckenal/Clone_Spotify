import React from "react";
import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";

import Link from "next/link";

function register() {
  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <Image className={styles.logo} src={Logo} alt="" />
        <div className={styles.redirect}>
          <Link href="/auth/login">SIGN IN</Link>
          <Link href="">SIGN UP</Link>
        </div>
        <form action="">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <input type="date" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder=" Confirm Password" />

          <div className={styles.checkbox}>
            <input type="checkbox" name="" id="" />
            <p>Stay signed in</p>
          </div>

          <button className={styles.singBtn}>CREATE ACOUNT</button>
        </form>
      </div>
    </div>
  );
}

export default register;
