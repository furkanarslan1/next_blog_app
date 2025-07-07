"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface Category {
  id: number;
  name: string;
}

export default function Categories() {
  const [category, setCategory] = useState<Category[]>([]);

  const gradientClasses = [
    "from-orange-500 hover:to-orange-900",
    "from-red-500 hover:to-red-900",
    "from-blue-500 hover:to-blue-900",
    "from-green-500 hover:to-green-900",
    "from-purple-500 hover:to-purple-900",
    "from-pink-500 hover:to-pink-900",
    "from-yellow-400 hover:to-yellow-700",
    "from-teal-400 hover:to-teal-800",
    "from-cyan-400 hover:to-cyan-900",
    "from-indigo-500 hover:to-indigo-900",
  ];

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="w-full overflow-x-hidden px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {category.map((cat, index) => {
          const colorIndex = index % gradientClasses.length;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.name}`}
              className={clsx(
                "w-full aspect-square flex items-center justify-center font-bold rounded-xl transition-[background-image] duration-500 bg-gradient-to-r to-transparent text-white text-center",
                gradientClasses[colorIndex]
              )}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
