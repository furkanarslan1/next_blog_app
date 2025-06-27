import React, { ReactNode } from "react";
import HomeBlog from "./components/blogs/HomeBlog";
import Category_blog from "./components/blogs/Category_blog";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <main>{children}</main>
      <section className="border-1 p-4 rounded-2xl">
        <Category_blog />
        {/* <HomeBlog /> */}
      </section>
    </div>
  );
}
