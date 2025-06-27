"use client";

import React, { useEffect, useState } from "react";
import HomeBlog from "./HomeBlog";
import clsx from "clsx";

interface Category {
  name: string;
  id: number;
}

export default function Category_blog() {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`, {
  //     cache: "no-store",
  //   });

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategories, setActiveCategories] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setActiveCategories(data[0].id);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);
  //   const categories: Category[] = await res.json();
  return (
    <div>
      <ul className="flex items-center gap-4 overflow-x-scroll scrollbar-hide">
        {categories &&
          categories.map((cat) => (
            <li
              className={clsx(
                `px-4 py-2 font-bold rounded-2xl cursor-pointer`,
                activeCategories === cat.id && "bg-white text-black "
              )}
              key={cat.id}
              onClick={() => setActiveCategories(cat.id)}
            >
              {cat.name}
            </li>
          ))}
      </ul>
      <div>
        <HomeBlog activeCategories={activeCategories} />
      </div>
    </div>
  );
}
