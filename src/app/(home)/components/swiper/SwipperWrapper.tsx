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
  loading: () => (
    <div className="w-full h-[70vh] sm:h-[60vh] md:h-[80vh] bg-transparent flex items-center justify-center animate-pulse rounded-md">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function SwipperWrapper({ posts }: { posts: HomeSlider[] }) {
  return <Swipper posts={posts} />;
}
