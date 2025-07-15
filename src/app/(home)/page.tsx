import Aside from "./components/aside/Aside";
import Category_blog from "./components/blogs/Category_blog";
import Categories from "./components/Categories";

import SwipperWrapper from "./components/swiper/SwipperWrapper";

interface HomeSlider {
  id: number;
  imageUrl?: string;
  description: string;
  title: string;
}

interface Category {
  id: number;
  name: string;
}

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/home_slider`,
    { cache: "no-store" }
  );
  const categoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/category`,
    { cache: "no-store" }
  );
  const category: Category[] = await categoryRes.json();

  const posts: HomeSlider[] = await res.json();
  return (
    <div className="max-w-7xl mx-auto px-4 overflow-x-hidden">
      <SwipperWrapper posts={posts} />

      <div className="pt-14 grid grid-cols-1 md:grid-cols-2 p-8 gap-6">
        <Categories category={category} />
        <Aside />
      </div>

      <Category_blog />
    </div>
  );
}
