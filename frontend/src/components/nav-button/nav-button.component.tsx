import Link from "next/link";
import Button from "../button/button.component";
import { PropsWithChildren } from "react";

type NavButtonProps = {
  path: string;
  className?: string;
} & PropsWithChildren;

export default function NavButton({
  path,
  children,
  className = "",
}: NavButtonProps) {
  return (
    <Link style={{ textDecoration: "none" }} href={path}>
      <Button className={className}>{children}</Button>
    </Link>
  );
}
