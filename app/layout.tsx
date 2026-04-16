import type { Metadata } from "next";
import "./globals.css";
import { UIProvider } from "@/lib/ui-context";

import { Noto_Sans_Malayalam, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Razeena & Yousuf",
  description: "Nikkah Invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} ${malayalam.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UIProvider >{children}</UIProvider></body>
    </html>
  );
}
