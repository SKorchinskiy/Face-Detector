import { MouseEventHandler, PropsWithChildren } from "react";
import style from "./button.module.css";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

type ButtonProps = {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "submit" | "button";
  className?: string;
} & PropsWithChildren;

export default function Button({
  children,
  btnType = "button",
  className = "",
  clickHandler,
}: ButtonProps) {
  return (
    <button
      type={btnType}
      className={`${style[className]} ${inter.className}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
