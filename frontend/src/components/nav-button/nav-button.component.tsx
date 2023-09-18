import Link from "next/link";
import Button from "../button/button.component";
import { PropsWithChildren } from "react";

type NavButtonProps = {
  path: string;
} & PropsWithChildren;

export default function NavButton({ path, children }: NavButtonProps) {
  return (
    <Link style={{ textDecoration: "none" }} href={path}>
      <Button>{children}</Button>
    </Link>
  );
}
