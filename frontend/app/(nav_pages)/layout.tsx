import Navbar from "./_components/ui/navbar/navbar.component";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={inter.className}
      style={{
        height: "100%",
      }}
    >
      <Navbar />
      {children}
    </div>
  );
}
