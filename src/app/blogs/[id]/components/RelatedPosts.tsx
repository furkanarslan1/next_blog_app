"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

type RelatedPost = {
  id: number;
  title: string;
  imageUrl: string | null;
  slug: string;
};

type Props = {
  relatedPosts: RelatedPost[];
};

export default function RelatedPosts({ relatedPosts }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const getScrollAmount = () => {
    const width = window.innerWidth;

    if (width < 640) return 260; // Mobil: 1 kart
    if (width < 1024) return 540; // Tablet: 2 kart
    return 800; // Desktop: 3 kart
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = getScrollAmount();
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = getScrollAmount();
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    checkScroll();

    scrollContainer.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
  }, []);

  if (relatedPosts.length === 0) return null;
  return (
    <div className="mt-12 relative">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 ">Related blogs</h2>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth px-2 "
        style={{ scrollSnapType: "x mandatory" }}
      >
        {relatedPosts.map((related) => (
          <div
            key={related.id}
            className="min-w-[250px] max-w-[250px] flex-shrink-0 border rounded-md p-4"
          >
            {related.imageUrl && (
              <Link href={`/blogs/${related.id}`}>
                <div className="relative w-full aspect-[4/3] mb-2">
                  <Image
                    src={related.imageUrl}
                    alt={related.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    className="object-cover rounded-md"
                  />
                </div>
              </Link>
            )}
            <h3 className="text-sm font-semibold ">
              {related.title.length > 10
                ? related.title.slice(0, 10) + "..."
                : related.title}
            </h3>
          </div>
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-black hover:text-white transition-all duration-300  bg-white text-black rounded-full"
        >
          <IoIosArrowDroprightCircle className="text-4xl" />
        </button>
      )}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 text-3xl  -translate-y-1/2 cursor-pointer  hover:bg-black hover:text-white transition-all duration-300  bg-white text-black rounded-full"
        >
          <IoIosArrowDropleftCircle className="text-4xl" />
        </button>
      )}
    </div>
  );
}
