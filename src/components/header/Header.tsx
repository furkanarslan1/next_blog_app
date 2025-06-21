"use client";

import React from "react";
import { headerLinks, socialLinks } from "./headerLinks";
import Link from "next/link";

import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { HiMenuAlt1 } from "react-icons/hi";

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between gap-4 p-4 lg:p-8 ">
      <div className="flex items-center gap-16">
        <Link href="/">
          <h1 className="border-b-1 pb-1">
            <span className="font-extrabold text-2xl pr-2">Next</span> Blog{" "}
          </h1>
        </Link>

        <div className="md:flex items-center  gap-4 hidden">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                pathname === link.href &&
                  "bg-white  text-black px-4 py-2 rounded-md"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="md:flex items-center gap-14 text-lg hidden">
        <div className="flex items-center gap-4 ">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:opacity-75 transition-all duration-500-"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        <Link
          href="/sign-in"
          className="bg-white/80 text-black px-4 py-2 rounded-md hover:bg-white/60 transition-all duration-500"
        >
          Sign In
        </Link>
      </div>

      <div className=" md:hidden ">
        <Sheet>
          <SheetTrigger>
            <HiMenuAlt1 className="text-3xl" />
          </SheetTrigger>
          <SheetContent className="bg-black/80 text-white p-6 backdrop-blur-md">
            <SheetHeader>
              <SheetTitle className="text-white text-center text-2xl">
                Menu
              </SheetTitle>
              <SheetDescription className="flex flex-col items-start mt-8 text-white  gap-4">
                {headerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      pathname === link.href &&
                        "bg-white  text-black p-2 rounded-md"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </SheetDescription>

              <SheetDescription className="flex  items-start mt-8 text-white text-xl  gap-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:opacity-75 transition-all duration-500-"
                  >
                    {link.icon}
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
