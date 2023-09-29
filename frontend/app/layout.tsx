import "./globals.css";
import ParticlesBackground from "./_components/ui/particles/particles.component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TagsProvider from "./(nav_pages)/_context/tags.context";
import { PropsWithChildren } from "react";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Face Detection",
  description: "Detect Faces on the Provided Images",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TagsProvider>{children}</TagsProvider>
        <ParticlesBackground />
      </body>
    </html>
  );
}
