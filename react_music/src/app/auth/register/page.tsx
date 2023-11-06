"use client";
import { useState } from "react";

import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Link from "next/link";
import { type } from "os";

function register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const [showPassword, setShowPassword] = useState<any>("password");
  const [passwordImg, setPasswordImg] = useState<any>(<AiFillEye />);

  function onClickPassword(e: any): void {
    e.preventDefault();
    setShowPassword(showPassword === "password" ? "text" : "password");

    setPasswordImg(
      showPassword === "password" ? <AiFillEyeInvisible /> : <AiFillEye />
    );
  }

  function handleFormSubmit(e: any): any {
    e.preventDefault();

    const birthNum: number = new Date(birth).getFullYear();

    const currentYear: number = new Date().getFullYear();

    const age: number = currentYear - birthNum;

    if (name && email && birthNum && password && confirmPassword != "") {
      if (age < 18) {
        alert("você precisa ter mais que 18 anos");
      } else if (password != confirmPassword) {
        alert("as senhas precisam ser iguais");
      } else {
        alert("deu certo");
      }
    } else {
      alert("preencha todos os campos");
    }
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onClickPassword}>{passwordImg}</button>
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={onClickPassword}>{passwordImg}</button>
          </div>

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
