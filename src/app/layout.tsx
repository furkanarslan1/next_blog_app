import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AppInit from "@/components/user/Appinit";
import { defaultMetadata } from "@/lib/seo/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: {
//     default: "Next Blog",
//     template: "%s | Next Blog",
//   },
//   description: "Fullstack developer blog platform built with Next.js 15.",
//   keywords: ["Next.js", "React", "Blog", "Web Development"],
//   icons: {
//     icon: "/favicon.ico",
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
// };

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Home Page",
  description: "here is home page description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  flex flex-col min-h-screen bg-black text-white`}
      >
        <header className="fixed w-full top-0 left-0 z-50 bg-transparent backdrop-blur-3xl  ">
          <Header />
        </header>
        <main className="flex-1 pt-30 max-w-7xl mx-auto px-4">
          <AppInit>{children}</AppInit>
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
