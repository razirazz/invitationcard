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
  title: "Razeena & Yousuf Ali",
  description: "Marriage Invitation",
};

import { Analytics } from "@vercel/analytics/next"
import LangToggle from "@/components/lang-toggle";
import ThemeToggle from "@/components/theme-toggle";
import FallingParticles from "@/components/bg/falling";

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
      <body className="min-h-full flex flex-col pt-16 md:pt-0">
        <Analytics />
        <UIProvider >

          <div className="fixed top-3 right-3 md:top-4 md:right-4 z-50 pb-20">
            <div className="
              flex gap-2
              bg-white/10 dark:bg-white/5
              backdrop-blur-md
              border border-white/10
              px-3 py-2
              rounded-full
              shadow-lg"
            >
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
          <FallingParticles />
          <div>
            {children}
          </div>

        </UIProvider></body>
    </html>
  );
}
