"use client";

import dynamic from "next/dynamic";
interface HomeSlider {
  id: number;
  imageUrl?: string;
  description: string;
  title: string;
}

const Swipper = dynamic(() => import("./Swipper"), {
  ssr: false,
});

export default function SwipperWrapper({ posts }: { posts: HomeSlider[] }) {
  return <Swipper posts={posts} />;
}
