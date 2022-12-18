import React, { useEffect, useRef, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axiosClient from "../../apis/axiosClient";
import styles from "./login.module.scss";
import Input from "../../component/Input";
import Text from "../../component/Text";
import UserIcon from "../../public/icons/user-icon.svg";
import Logo from "../../public/icons/logo.svg";
import LockIcon from "../../public/icons/lock-icon.svg";
import Polygon from "../../public/icons/polygon.svg";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  let isValidForm = false;

  const onChangeName = (e: any) => {
    setEmail(e.target.value);
    setMessage("");
    passwordRef.current?.classList.remove("field-focus");
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
    setMessage("");
  };

  const handleFocus = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.classList.add("field-focus");
  };

  const handleBlur = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.classList.remove("field-focus");
  };

  useEffect(() => {
    if (email && password) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password]);

  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        submitBtnRef.current?.click();
      }
    });
  }, []);

  useEffect(() => {
    // Fix show scrollbar in login page
    document.body.style.overflow = "visible";
  }, []);

  const submit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.payload.user;
          cookie.set("token_rgs_pt", response.payload.token, { expires: 1 });
          localStorage.setItem("user_id", JSON.stringify(user._id));
          localStorage.setItem("username", JSON.stringify(user.name));
          router.push("/user");
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.heading}>
            <div className={styles.title}>
              <Text content="Movie Page" size="title-6" color="blue-white" />
            </div>
            <div className={styles.title} style={{ marginTop: "-4px" }}>
              <Text content="Management" size="title-6" color="light-red" />
            </div>
            <div className={styles.text}>
              <Text content="Sign In to start your session" size="title-5" />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.text}>
            <Text
              content="Sign In to start your session"
              size="title-5"
              color="white"
            />
          </div>
          <div className={`${styles.error_message} ${message && styles.show}`}>
            <Text content={message} color="red" />
          </div>
          <div className={styles.form}>
            <div
              className={`${styles.form__control} ${message && styles.error}`}
              ref={emailRef}
            >
              <Input
                id="email"
                labelIcon={<UserIcon />}
                placeholder="User ID"
                handleFocus={() => handleFocus(emailRef)}
                size="100"
                handleBlur={() => handleBlur(emailRef)}
                handleChange={onChangeName}
              />
            </div>
            <div
              className={`${styles.form__control} ${message && styles.error}`}
              ref={passwordRef}
            >
              <Input
                id="password"
                labelIcon={<LockIcon />}
                size="100"
                type="password"
                placeholder="Password"
                handleFocus={() => handleFocus(passwordRef)}
                handleBlur={() => handleBlur(passwordRef)}
                handleChange={onChangePassword}
              />
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <button
            ref={submitBtnRef}
            className={`${active ? styles.active : ""}`}
            type="submit"
            onClick={submit}
          >
            <Polygon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
