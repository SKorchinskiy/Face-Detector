import Link from "next/link";
import Button, { ButtonProps } from "../button/button.component";

type NavButtonProps = { path: string } & ButtonProps;

const defaultProps: NavButtonProps = { path: "#", children: <></> };

export default function NavButton({
  path,
  children,
  ...options
} = defaultProps) {
  return (
    <Link
      style={{ textDecoration: "none" }}
      href={options?.disabled ? "#" : path}
    >
      <Button {...options}>{children}</Button>
    </Link>
  );
}
