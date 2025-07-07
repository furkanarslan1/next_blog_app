"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  selectedCategoryId?: string;
}

export default function CategoryList({
  selectedCategoryId,
}: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategories, setActiveCategories] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // fetch("/api/category")
    //   .then((res) => res.json())
    //   .then((data) => setCategories(data));

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    checkScroll();

    scrollContainer.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

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

  useEffect(() => {
    if (categories.length > 0) {
      setTimeout(() => checkScroll(), 0);
    }
  }, [categories]);

  const handleClick = (id: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("categoryId", id.toString());
    } else {
      params.delete("categoryId");
    }
    params.set("page", "1"); // if changed category page be equal to 1
    router.push(`/blogs?${params.toString()}`);
  };

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
  };

  return (
    <div className="relative text-[12px] md:text-sm font-bold">
      <ul
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth py-2"
      >
        <li
          onClick={() => handleClick(null)}
          className={clsx(
            "px-4 py-2 rounded-2xl cursor-pointer",
            !selectedCategoryId ? "bg-black text-white" : "bg-white text-black"
          )}
        >
          All
        </li>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={clsx(
              "px-4 text- md:px-6 py-0 rounded-2xl cursor-pointer flex items-center ",
              selectedCategoryId === String(cat.id)
                ? "bg-black text-white"
                : "bg-white text-black"
            )}
            onClick={() => handleClick(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2  -translate-y-1/2 text-3xl md:text-4xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300  bg-white text-black rounded-full"
        >
          <IoIosArrowDroprightCircle />
        </button>
      )}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 text-3xl  md:text-4xl  -translate-y-1/2 cursor-pointer  hover:bg-black hover:text-white transition-all duration-300  bg-white text-black rounded-full"
        >
          <IoIosArrowDropleftCircle />
        </button>
      )}
    </div>
  );
}
