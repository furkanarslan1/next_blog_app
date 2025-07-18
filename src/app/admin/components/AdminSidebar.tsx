import Link from "next/link";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminSidebar() {
  return (
    <Sheet defaultOpen>
      <SheetTrigger className="bg-white px-4 py-2 text-black rounded-2xl font-bold cursor-pointer">
        Admin
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-transparent backdrop-blur-3xl shadow-2xl shadow-white"
      >
        <SheetHeader>
          <SheetTitle className="text-white font-bold  p-4 border-b-1 text-center">
            Admin Panel
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="p-4 border-r-1 rounded-2xl flex flex-col gap-6">
          {/* <Link
            href="/admin/posts/new"
            className="font-bold text-white border-1 px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Users
          </Link> */}
          <Link
            href="/admin/posts/new"
            className="font-bold text-white  border-1 px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Add New Post
          </Link>

          <Link
            href="/admin/posts/delete"
            className="font-bold text-white  border-1 px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Delete Post
          </Link>

          <Link
            href="/admin/posts/homeSlider"
            className="font-bold text-white  border-1 px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Home Slider
          </Link>

          {/* <Link
            href="/admin/posts/comments"
            className="font-bold text-white  border-1 px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Comments
          </Link> */}

          <Link
            href="/admin/posts/category"
            className="font-bold text-white  border-1 px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Category
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
