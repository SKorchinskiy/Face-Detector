import styles from "./page.module.css";
import { Fragment } from "react";
import Image from "next/image";
import NavButton from "./_components/nav-button/nav-button.component";

export default function Home() {
  return (
    <Fragment>
      <div className={styles["faces-container"]}>
        <Image
          src="/face.png"
          width="350"
          height="350"
          className={`${styles["face-image"]} ${styles["rotate-left"]}`}
          alt="face"
        />
        <Image
          src="/face.png"
          width="350"
          height="350"
          className={`${styles["face-image"]} ${styles["rotate-right"]}`}
          alt="face"
        />
      </div>
      <div className={styles["content-container"]}>
        <h1 className={styles["content-container__headline"]}>
          Detect Faces Using Images
        </h1>
        <div className={styles["content-container__body"]}>
          <NavButton className="btn-container" path="/detect">
            Try Now
          </NavButton>
          <NavButton className="btn-container" path="/auth">
            Sign Up
          </NavButton>
        </div>
        <div className={styles["content-container__footnote"]}>
          <h1 className={styles["content-container__footnote-title"]}>
            Over 1+ million users use Face Detector
          </h1>
        </div>
      </div>
    </Fragment>
  );
}
