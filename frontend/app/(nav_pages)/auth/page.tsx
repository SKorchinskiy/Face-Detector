"use client";

import styles from "./page.module.css";
import SignInForm from "./_components/sign-in-form/sign-in-form.component";
import { useContext, useEffect, useState } from "react";
import Button from "../../_components/button/button.component";
import SignUpForm from "./_components/sign-up-form/sign-up-form.component";
import { fetchData } from "../_utils/fetch.util";
import { useRouter } from "next/navigation";
import { UserContext } from "../../_context/user.context";

export type Field = {
  [key: string]: string;
};

export default function Auth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.isSignedIn) router.push("https://skorchinskiy.pro/profile");
  }, [router, userContext]);

  const authHandler = async (fields: Array<Field>) => {
    const baseUrl = "https://skorchinskiy.pro:8000/auth";
    const url = baseUrl + (isSignedIn ? "/sign-in" : "/sign-up");
    let token = await fetchData({
      url,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(fields),
      },
    });

    if (!isSignedIn) {
      token = await fetchData({
        url: baseUrl + "/sign-in",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(fields),
        },
      });
    }

    if (token) {
      userContext.toggleAuthState();
      router.push("https://skorchinskiy.pro/profile");
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-container__form"]}>
        <div className={styles["auth-container__form_element"]}>
          <Button
            className="back-and-forth-mini"
            disabled={isSignedIn}
            clickHandler={isSignedIn ? () => {} : () => setIsSignedIn(true)}
          >
            Sign In
          </Button>
          <Button
            className="back-and-forth-mini"
            disabled={!isSignedIn}
            clickHandler={!isSignedIn ? () => {} : () => setIsSignedIn(false)}
          >
            Sign Up
          </Button>
        </div>
        {isSignedIn ? (
          <SignInForm authHandler={authHandler} />
        ) : (
          <SignUpForm authHandler={authHandler} />
        )}
      </div>
    </div>
  );
}
