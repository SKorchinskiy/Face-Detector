import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
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
        <Link href={"/sign-in"} className={styles.link}>
          Sign In
        </Link>
        <Link href={"/sign-up"} className={styles.link}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
