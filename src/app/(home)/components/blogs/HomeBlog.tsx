import React from "react";
import HomeBlogitem from "./HomeBlogitem";

export default function HomeBlog() {
  return (
    <div className="py-8">
      <h4 className="text-2xl font-bold border-b-1 pb-3">Blogs</h4>
      <HomeBlogitem image="/blog.jpg" header="header" p="pasdasd" />
    </div>
  );
}
