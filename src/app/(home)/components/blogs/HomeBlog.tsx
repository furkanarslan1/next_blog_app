"use client";

import React, { useEffect, useState } from "react";
import HomeBlogitem from "./HomeBlogitem";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

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

    fetch(`/api/posts?categoryId=${activeCategories}&limit=5&page=1`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.posts));
  }, [activeCategories]);
  // const blogs: Blog[] = await res.json();
  return (
    <div className="py-8 max-h-[500px] overflow-y-scroll custom-scroll ">
      <h4 className="text-2xl font-bold border-b-1 pb-3">Blogs</h4>
      <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
