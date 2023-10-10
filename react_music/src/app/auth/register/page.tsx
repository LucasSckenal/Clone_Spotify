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
  const [birth, setBirth] = useState<number>();
  const [password, setPassword] = useState<string>("");

  function handleclick() {
    console.log(name);
    console.log(email);
    console.log(birth);
    console.log(password);
  }

  const formatBirth = (e: any) => {
    const inputValue = e.target.value;

    if (/^\d{4}-\d{2}-\d{2}$/.test(inputValue)) {
      setBirth(inputValue);
    } else {
      alert(`Erro ao colocar a data`);
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <Image className={styles.logo} src={Logo} alt="" />
        <div className={styles.redirect}>
          <Link href="/auth/login">SIGN IN</Link>
          <Link href="">SIGN UP</Link>
        </div>
        <form action="">
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
            onChange={(e) => setBirth(parseInt(e.target.value))}
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

          <button className={styles.singBtn} onClick={handleclick}>
            CREATE ACOUNT
          </button>
        </form>
      </div>
    </div>
  );
}

export default register;
