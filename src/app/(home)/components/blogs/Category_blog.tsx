"use client";

import React, { useEffect, useRef, useState } from "react";
import HomeBlog from "./HomeBlog";
import clsx from "clsx";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Link from "next/link";

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
    return () => {
      scrollContainer.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setTimeout(() => checkScroll(), 0);
    }
  }, [categories]);

  return (
    <div className="">
      <div className="relative">
        <ul
          ref={scrollRef}
          className=" px-8 flex items-center gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {categories &&
            categories.map((cat) => (
              <li
                className={clsx(
                  `md:px-4 md:py-2 p-1 font-bold rounded-2xl cursor-pointer whitespace-nowrap `,
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
      <div>
        <Link
          href={`/categories/${activeCategories}`}
          className="relative group overflow-hidden flex items-center gap-4 rounded-2xl px-4 py-2 w-full max-h-20 mt-5 cursor-pointer font-bold bg-white text-black transition-all duration-300"
        >
          {/* Kayan siyah arkaplan efekti */}
          <span className="absolute inset-0 bg-gradient-to-r from-black to-black/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-800 ease-out z-0"></span>

          {/* İçerik */}
          <FaArrowAltCircleRight className="text-3xl z-10 transition-all duration-300 group-hover:text-white" />
          <span className="z-10 md:text-xl transition-all duration-300 group-hover:text-white">
            All Blogs
          </span>
        </Link>
      </div>
    </div>
  );
}
