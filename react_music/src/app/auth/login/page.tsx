"use client";
import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/app/api/firebase";

const createUserFormSchema = z.object({
  username: z.string().nonempty("Nome de usuario é obrigatório para logar"),
  password: z.string().nonempty("A sua senha pode estar errada"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function Login() {
  const [showPassword, setShowPassword] = useState<any>("password");
  const [passwordImg, setPasswordImg] = useState<any>(<AiFillEye />);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function FormSubmit(data: any) {
    const { username, password } = data;

    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        if (username === docData.name && password === docData.password) {
          // Os dados do usuário correspondem aos dados no Firestore
          console.log(`Usuário autenticado: ${username}`);
          alert("Autenticação bem-sucedida");

          return; // Saia do loop forEach após encontrar uma correspondência
        }
      });

      // Se nenhum usuário correspondente for encontrado, mostre uma mensagem de erro
      alert("Nome de usuário ou senha incorretos");
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  }

  function onClickPassword(e: any): void {
    e.preventDefault();
    setShowPassword(showPassword === "password" ? "text" : "password");

    setPasswordImg(
      showPassword === "password" ? <AiFillEyeInvisible /> : <AiFillEye />
    );
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <Image className={styles.logo} src={Logo} alt="" />
        <div className={styles.redirect}>
          <Link href="">SIGN IN</Link>
          <Link href="/auth/register">SIGN UP</Link>
        </div>

        <form onSubmit={handleSubmit(FormSubmit)}>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}
          <div className={styles.passwordContainer}>
            <input
              type={showPassword}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <button onClick={onClickPassword}>{passwordImg}</button>
          </div>

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
