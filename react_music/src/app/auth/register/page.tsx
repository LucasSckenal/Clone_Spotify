"use client";
import { useState } from "react";

import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/api/firebase";

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

function register() {
  const [showPassword, setShowPassword] = useState<any>("password");
  const [passwordImg, setPasswordImg] = useState<any>(<AiFillEye />);
  const route = useRouter();

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

      route.push("/auth/login");
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
        <Image className={styles.logo} src={Logo} alt="Spotify logo" />
        <div className={styles.redirect}>
          <Link href="/auth/login">SIGN IN</Link>
          <Link href="">SIGN UP</Link>
        </div>
        <form onSubmit={handleSubmit(FormSubmit)}>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
          <input type="date" {...register("birth")} />
          {errors.birth && <span>{errors.birth.message}</span>}
          <div className={styles.passwordContainer}>
            <input
              type={showPassword}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <button onClick={onClickPassword}>{passwordImg}</button>
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword}
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
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
