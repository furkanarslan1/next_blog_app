"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import clsx from "clsx";
import { useauthStore } from "@/lib/stores/authStore";
import { FaPowerOff } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface Props {
  username: string;
}

export default function HeaderNav({ username }: Props) {
  const segment = useSelectedLayoutSegment();
  const clearUser = useauthStore((state) => state.clearUser);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearUser();
    router.push("/login");
    setOpen(false);
  };

  const navItems = [
    { label: "Profile", path: `/profile/${username}`, segment: null },
    {
      label: "Options",
      path: `/profile/${username}/user-options`,
      segment: "user-options",
    },
    {
      label: "Comments",
      path: `/profile/${username}/user-comments`,
      segment: "user-comments",
    },
    {
      label: "Likes",
      path: `/profile/${username}/user-likes`,
      segment: "user-likes",
    },
  ];

  return (
    <header className="flex flex-col items-start gap-4 mb-2 border-r-1 pr-4 text-sm md:text-lg">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger onClick={() => setOpen(true)}>
          <p className="font-bold border-1  p-1 rounded-md bg-white text-black cursor-pointer">
            Menu
          </p>
        </SheetTrigger>
        <SheetContent className="bg-black">
          <SheetHeader>
            <SheetTitle className="text-white">User Menu</SheetTitle>
            <div className="flex flex-col gap-3 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "font-bold px-4 py-2 border border-white rounded-2xl text-center hover:opacity-80 hover:bg-white hover:text-black",
                    segment === item.segment && "bg-white text-black shadow"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 font-bold px-4 py-2 border border-white rounded-2xl text-white hover:bg-white hover:text-black"
              >
                <FaPowerOff />
                <span>Logout</span>
              </button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
