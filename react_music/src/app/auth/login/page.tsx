"use client";
import styles from "./styles.module.scss";
import "./background.css";
import Image from "next/image";
import Logo from "../../../../public/images/spotify-logo-0.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/api/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const createUserFormSchema = z.object({
  username: z.string().nonempty("Nome de usuario é obrigatório para logar"),
  password: z.string().nonempty("A sua senha pode estar errada"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function Login() {
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

  async function FormSubmit(data: any) {
    const { username, password } = data;
    let confirmUser: boolean = false;

    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        if (username === docData.name && password === docData.password) {
          confirmUser = true;
          toast.success("Successful authentication");

          setTimeout(() => {
            route.push("/");
          }, 1500);
        }
      });
      if (confirmUser == false) {
        toast.warning("Incorrect username or password");
      }
    } catch (error) {
      // console.error("Erro ao buscar dados", error);
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      ;
      <div className={styles.containerLogin}>
        <div className={styles.containerForm}>
          <Image className={styles.logo} src={Logo} alt="" />
          <div className={styles.redirect}>
            <Link href="">SIGN IN</Link>
            <Link href="/auth/register">SIGN UP</Link>
          </div>

          <form onSubmit={handleSubmit(FormSubmit)}>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
            />
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
    </>
  );
}

export default Login;
