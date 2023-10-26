"use client";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/app/api/firebase";

async function fetchDataFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
      console.log(`${doc.id} => ${doc.data().email}`);
    });
  } catch (error) {
    console.error("Erro ao buscar dados", error);
  }
}

function Login() {
  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

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
