"use client";

import React, { useEffect, useState } from "react";
import HomeBlogitem from "./HomeBlogitem";

interface Blog {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface Props {
  activeCategories: number | null;
}

export default function HomeBlog({ activeCategories }: Props) {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
  //   cache: "no-store",
  // });

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (activeCategories === null) return;

    fetch(`/api/posts?categoryId=${activeCategories}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.posts));
  }, [activeCategories]);
  // const blogs: Blog[] = await res.json();
  return (
    <div className="py-8">
      <h4 className="text-2xl font-bold border-b-1 pb-3">Blogs</h4>
      {blogs &&
        blogs.map((blog) => (
          <HomeBlogitem
            key={blog.id}
            imageUrl={blog.imageUrl}
            title={blog.title}
            description={blog.description}
          />
        ))}
    </div>
  );
}
