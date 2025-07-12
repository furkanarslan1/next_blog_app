"use client";

import React from "react";
import { headerLinks, socialLinks } from "./headerLinks";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { HiMenuAlt1 } from "react-icons/hi";
import { useauthStore } from "@/lib/stores/authStore";

export default function Header() {
  const pathname = usePathname();
  const user = useauthStore((state) => state.user);
  const clearUser = useauthStore((state) => state.clearUser); // logout
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearUser();
    router.push("/login");
  };

  const smLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/contact",
      label: "Contact",
    },
    {
      href: "/blogs",
      label: "Blogs",
    },
    {
      href: "/categories",
      label: "Categories",
    },
    {
      href: ` /profile/${user?.username}`,
      label: "Categories",
    },
  ];
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
            // <Link
            //   key={link.href}
            //   href={link.href}
            //   className={clsx(
            //     pathname === link.href &&
            //       "bg-white  text-black px-4 py-2 rounded-md"
            //   )}
            // >
            //   {link.label}
            // </Link>
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "relative group px-2 py-1",
                pathname === link.href &&
                  "bg-white  text-black px-4 py-2 rounded-md"
              )}
            >
              {link.label}
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-white group-hover:w-full group-hover:left-0 transition-all duration-500"></span>
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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black border-1 rounded-2xl">
                {" "}
                <div>
                  {user ? (
                    <div className="">
                      <p> {user.firstName}</p>
                    </div>
                  ) : (
                    <Link
                      className="bg-white/80 text-black px-4 py-2 rounded-md hover:bg-white/60 transition-all duration-500"
                      href="/login"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="cursor-pointer font-bold hover:bg-black hover:text-white">
                  <Link href={`/profile/${user?.username}/user-options`}>
                    Options
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="cursor-pointer font-bold hover:bg-black hover:text-white">
                  <Link href={`/profile/${user?.username}/user-comments`}>
                    Comments
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="cursor-pointer font-bold hover:bg-black hover:text-white">
                  <Link href={`/profile/${user?.username}/user-likes`}>
                    Like
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  {" "}
                  <button
                    className="cursor-pointer font-bold hover:bg-black hover:text-white p-2 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* <Link
      href="/login"
      className="bg-white/80 text-black px-4 py-2 rounded-md hover:bg-white/60 transition-all duration-500"
    >
      Login
    </Link> */}
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
                {smLinks.map((link) => (
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
