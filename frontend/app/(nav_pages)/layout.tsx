import { Fragment, PropsWithChildren } from "react";

import Navbar from "./_components/ui/navbar/navbar.component";

export default function NavLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}
