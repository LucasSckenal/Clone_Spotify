"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
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

const createUserFormSchema = z.object({
  username: z.string().nonempty("Nome de usuario é obrigatório"),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("formato de email inválido"),
  birth: z.string().refine(
    (value) => {
      const birthDate = new Date(value);
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
      return birthDate <= minAgeDate;
    },
    {
      message: "Você deve ter pelo menos 18 anos de idade.",
    }
  ),
  password: z.string().nonempty("Precisa de uma senha"),
  confirmPassword: z.string().nonempty("A senha precisa ser igual"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function Login() {
  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const [showPassword, setShowPassword] = useState<any>("password");
  const [passwordImg, setPasswordImg] = useState<any>(<AiFillEye />);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function FormSubmit(e: any) {
    if (e.password == e.confirmPassword) {
      const name: string = e.username;
      const email: string = e.email;
      const birth: string = e.birth;
      const password: string = e.password;

      const userCollections = collection(db, "users");

      const user = await addDoc(userCollections, {
        name,
        email,
        birth,
        password,
      });

      alert("deu certo");
    } else {
      alert("não deu certo");
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
