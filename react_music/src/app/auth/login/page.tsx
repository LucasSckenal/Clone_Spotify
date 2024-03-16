import React from "react";
import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";

import Link from "next/link";

function Login() {
  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <Image className={styles.logo} src={Logo} alt="" />
        <div className={styles.redirect}>
          <Link href="">SIGN IN</Link>
          <Link href="/auth/register">SIGN UP</Link>
        </div>

        <form action="">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />

          <div className={styles.checkbox}>
            <input type="checkbox" name="" id="" />
            <p>Stay signed in</p>
          </div>

          <button className={styles.singBtn}>SIGN IN</button>

          <button>Forgot password</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
