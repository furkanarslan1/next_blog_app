"use client";

import React, { useEffect, useRef, useState } from "react";
import HomeBlog from "./HomeBlog";
import clsx from "clsx";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

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

  useEffect(() => {
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

  return (
    <div>
      <div className="relative">
        <ul
          ref={scrollRef}
          className=" px-8 flex items-center gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {categories &&
            categories.map((cat) => (
              <li
                className={clsx(
                  `px-4 py-2 font-bold rounded-2xl cursor-pointer whitespace-nowrap `,
                  activeCategories === cat.id && "bg-white text-black "
                )}
                key={cat.id}
                onClick={() => setActiveCategories(cat.id)}
              >
                {cat.name}
              </li>
            ))}
        </ul>
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2  -translate-y-1/2 text-3xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300  bg-white text-black rounded-full"
          >
            <IoIosArrowDroprightCircle />
          </button>
        )}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 text-3xl  -translate-y-1/2 cursor-pointer  hover:bg-black hover:text-white transition-all duration-300  bg-white text-black rounded-full"
          >
            <IoIosArrowDropleftCircle />
          </button>
        )}
      </div>

      <div>
        <HomeBlog activeCategories={activeCategories} />
      </div>
    </div>
  );
}
