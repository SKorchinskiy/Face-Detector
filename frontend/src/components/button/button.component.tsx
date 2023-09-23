import { MouseEventHandler, PropsWithChildren } from "react";
import style from "./button.module.css";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

export type ButtonProps = {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "submit" | "button";
  className?: string;
  disabled?: boolean;
} & PropsWithChildren;

export default function Button({
  children,
  btnType = "button",
  className = "",
  disabled = false,
  clickHandler,
}: ButtonProps) {
  return (
    <button
      type={btnType}
      className={`${style[className]} ${inter.className} ${
        disabled ? style["disabled"] : ""
      } `}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
