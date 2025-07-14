import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { headerLinks, socialLinks } from "../header/headerLinks";
import { IoMail } from "react-icons/io5";

interface catType {
  id: number;
  slug: string;
  name: string;
}

export default async function Footer() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "desc" },
    take: 10,
  });
  return (
    <footer className="bg-black text-white py-10 px-4 mt-20 border-t-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/">
            <h1 className="border-b-2 pb-1">
              <span className="font-extrabold text-2xl pr-2">Next</span> Blog{" "}
            </h1>
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h4 className="border-b-2 pb-2  font-extrabold">Pages</h4>
          <ul className="flex flex-col items-center gap-4">
            {headerLinks &&
              headerLinks.map((link) => (
                <li key={link.label}>
                  <Link className=" relative group px-2 py-1" href={link.href}>
                    {link.label}
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-white group-hover:w-full group-hover:left-0 transition-all duration-500 "></span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h4 className="border-b-2 pb-2  font-extrabold">Categories</h4>
          <ul className="flex flex-col items-center gap-4">
            {categories &&
              categories.map((cat: catType) => (
                <li key={cat.id}>
                  <Link
                    className=" relative group px-2 py-1"
                    href={`/categories/${cat.slug}`}
                  >
                    {cat.name}{" "}
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-white group-hover:w-full group-hover:left-0 transition-all duration-500 "></span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex items-center flex-col gap-4">
          <h4 className="border-b-2 pb-2 font-extrabold">Contact Me</h4>
          <ul className="flex items-center gap-4">
            {socialLinks &&
              socialLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.icon}</Link>
                </li>
              ))}
            <li>
              {" "}
              <Link href="mailto:furkan@example.com">
                <IoMail className="text-2xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-4 font-extrabold">
        <p>&copy; 2025 Furkan Arslan. All rights reserved.</p>
      </div>
    </footer>
  );
}
