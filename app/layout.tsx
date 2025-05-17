import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";
import { MainNav } from "@/components/nav";
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Level Up AI Skills",
  description:
    "Practical AI training for professionals who want to stay relevant in a fast-changing world.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="flex flex-col min-h-[100dvh] bg-gray-50">
        <UserProvider userPromise={userPromise}>
          <MainNav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
