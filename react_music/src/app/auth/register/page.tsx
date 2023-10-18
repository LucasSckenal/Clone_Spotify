"use client";
import { useState } from "react";

import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";

import Link from "next/link";

function register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleFormSubmit(e: any): any {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(birth);
    console.log(password);
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <Image className={styles.logo} src={Logo} alt="" />
        <div className={styles.redirect}>
          <Link href="/auth/login">SIGN IN</Link>
          <Link href="">SIGN UP</Link>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="text" placeholder=" Confirm Password" />

          <div className={styles.checkbox}>
            <input type="checkbox" name="" id="" />
            <p>Stay signed in</p>
          </div>

          <button type="submit" className={styles.singBtn}>
            CREATE ACOUNT
          </button>
        </form>
      </div>
    </div>
  );
}

export default register;
