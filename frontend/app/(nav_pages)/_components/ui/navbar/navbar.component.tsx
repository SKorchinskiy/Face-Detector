"use client";

import { useContext, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { UserContext } from "../../../../_context/user.context";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setIsSignedIn(userContext.isSignedIn);
  }, [userContext]);

  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-container__left"]}>
        <Link href={"/"} className={styles.link}>
          <span>Face Detector</span>
        </Link>
      </div>
      <div className={styles["navbar-container__center"]}>
        <Link href={"/detect"} className={styles.link}>
          <span>Detect</span>
        </Link>
        <Link href={"/compare"} className={styles.link}>
          <span>Compare</span>
        </Link>
        <Link href={"/images"} className={styles.link}>
          <span>Images</span>
        </Link>
      </div>
      <div className={styles["navbar-container__right"]}>
        {isSignedIn ? (
          <>
            <Link href={"/profile"} className={styles.link}>
              Profile
            </Link>
            <Link
              href={"/auth"}
              className={styles.link}
              onClick={(e) => userContext.toggleAuthState()}
            >
              Sign Out
            </Link>
          </>
        ) : (
          <Link href={"/auth"} className={styles.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
