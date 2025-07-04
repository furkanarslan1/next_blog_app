import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Next Blog",
    template: "%s | NextBlog",
  },
  description: "Frontend geliştirme, React ve Next.js üzerine içerikler.",
  keywords: [
    "Next.js",
    "React",
    "Frontend",
    "Blog",
    "Web Development",
    "JavaScript",
    "Furkan Arslan",
  ],
  authors: [{ name: "Furkan Arslan", url: "https://local3000.dev" }],
  creator: "Furkan Arslan",
  metadataBase: new URL("https://local3000.dev"),
  openGraph: {
    title: "Next Blog",
    description: "Frontend geliştiriciler için modern blog.",
    url: "https://local3000.dev",
    siteName: "Next Blog",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Blog",
    description: "Next.js ve React blogları.",
    creator: "@nextjs",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};
