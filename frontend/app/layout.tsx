import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TagsProvider from "./(nav_pages)/_context/tags.context";
import { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import UserProvider from "./_context/user.context";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Face Detection",
  description: "Detect Faces on the Provided Images",
};

const DynamicParticles = dynamic(
  () => import("./_components/particles/particles.component")
);

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <TagsProvider>{children}</TagsProvider>
        </UserProvider>
        <DynamicParticles />
      </body>
    </html>
  );
}
