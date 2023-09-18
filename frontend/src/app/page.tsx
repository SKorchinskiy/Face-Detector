import styles from "./page.module.css";
import { Fragment } from "react";
import Image from "next/image";
import NavButton from "@/components/nav-button/nav-button.component";

export default function Home() {
  return (
    <Fragment>
      <div
        style={{
          height: "300px",
        }}
      >
        <Image
          src="/face.png"
          width="350"
          height="350"
          style={{
            position: "absolute",
            zIndex: 10,
            transform: "rotate(-25deg)",
            left: "60px",
          }}
          alt="face"
        />
        <Image
          src="/face.png"
          width="350"
          height="350"
          style={{
            position: "absolute",
            zIndex: 10,
            transform: "rotate(25deg)",
            right: "60px",
          }}
          alt="face"
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.headline}>Detect Faces Using Images</h1>
        <div
          style={{
            display: "flex",
            width: "750px",
            justifyContent: "space-between",
          }}
        >
          <NavButton path="/">Try Now</NavButton>
          <NavButton path="/auth">Sign Up</NavButton>
        </div>
        <div className={styles.container}>
          <h1
            style={{
              position: "absolute",
              fontSize: "20px",
              bottom: "20px",
            }}
          >
            Over 1+ million users use Face Detector
          </h1>
        </div>
      </div>
    </Fragment>
  );
}
