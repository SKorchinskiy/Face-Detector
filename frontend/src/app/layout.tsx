import "./globals.css";
import ParticlesBackground from "@/components/particles/particles.component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TagsProvider from "@/context/tags.context";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Face Detection",
  description: "Detect Faces on the Provided Images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TagsProvider>{children}</TagsProvider>
        <ParticlesBackground />
      </body>
    </html>
  );
}
