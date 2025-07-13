"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { FaBloggerB } from "react-icons/fa6";
import { useauthStore } from "@/lib/stores/authStore";

export default function MobileMenu() {
  const user = useauthStore((state) => state.user);
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 text-white bg-black bg-opacity-90 border-t border-gray-700 flex justify-around items-center h-16 z-50 md:hidden">
      <ul className="flex items-center justify-between gap-8 text-[11px]">
        <li
          className={clsx(
            "w-12 h-12 flex justify-center items-center rounded-full border border-gray-700",
            { "bg-white text-black mb-4": pathname === "/blogs" }
          )}
        >
          <Link href={"/blogs"} className="text-center">
            <FaBloggerB className="text-xl" />
          </Link>
        </li>
        <li
          className={clsx(
            "w-12 h-12 flex justify-center items-center rounded-full border border-gray-700",
            { "bg-white text-black mb-4": pathname === "/categories" }
          )}
        >
          <Link href={"/categories"} className="text-center">
            <BiSolidCategoryAlt className="text-xl" />
          </Link>
        </li>
        <li
          className={clsx(
            "w-12 h-12 flex justify-center items-center rounded-full border border-gray-700",
            { "bg-white text-black mb-4": pathname === "/" }
          )}
        >
          <Link href={"/"} className="text-center">
            <RiHome2Fill className="text-xl" />
          </Link>
        </li>
        <li
          className={clsx(
            "w-12 h-12 flex justify-center items-center rounded-full border border-gray-700",
            {
              "bg-white text-black mb-4  ":
                pathname === `/profile/${user?.username}`,
            }
          )}
        >
          <Link href={`/profile/${user?.username}`} className="text-center">
            <FaUserAlt className="text-xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
