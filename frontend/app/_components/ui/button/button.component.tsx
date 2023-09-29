import styles from "./button.module.css";
import { Inter } from "next/font/google";

import { MouseEventHandler, PropsWithChildren } from "react";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

export type ButtonProps = Partial<{
  btnType: "submit" | "button";
  className: string;
  disabled: boolean;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}> &
  PropsWithChildren;

const defaultProps: ButtonProps = {
  children: <></>,
  btnType: "button",
  className: "",
  disabled: false,
  clickHandler: (e) => {},
};

export default function Button({
  children,
  btnType,
  className,
  disabled,
  clickHandler,
} = defaultProps) {
  return (
    <button
      type={btnType}
      className={`${className ? styles[className] : ""} ${inter.className} ${
        disabled ? styles["disabled"] : ""
      } `}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
