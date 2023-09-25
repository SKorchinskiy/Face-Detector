import Link from "next/link";
import Button, { ButtonProps } from "../button/button.component";

type NavButtonProps = {
  path: string;
} & ButtonProps;

export default function NavButton({
  path,
  children,
  disabled,
  clickHandler,
  className = "",
}: NavButtonProps) {
  return (
    <Link style={{ textDecoration: "none" }} href={disabled ? "#" : path}>
      <Button
        className={className}
        disabled={disabled}
        clickHandler={clickHandler}
      >
        {children}
      </Button>
    </Link>
  );
}
