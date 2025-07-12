import { PaginationControls } from "@/components/pagination/pagination-controls";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryName: string }>;
  searchParams: { page?: string };
}) {
  const { categoryName } = await params;
  const searchParamsResolved = await searchParams;
  const page = Number(searchParamsResolved.page) || 1;

  const limit = 8;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/category?slug=${categoryName}&page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return notFound();
  }

  const { posts, totalPages, currentPage } = await res.json();
  if (!Array.isArray(posts)) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{categoryName} Category</h1>

      {posts.length === 0 ? (
        <p>No blogs available in this category yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {posts.map((post: Post) => (
            <div key={post.id}>
              <article className="min-h-[300px] md:min-h-[350px] w-ful overflow-hidden text-sm md:text-xl border p-6 rounded-2xl transition-all duration-500 hover:shadow-[0_0_15px_2px_white] shadow-white flex flex-col  gap-4 lg:gap-8">
                <div className=" relative aspect-video w-full">
                  <Image
                    src={post.imageUrl || "/blog.jpg"}
                    alt="blog image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center rounded-2xl"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="line-clamp-1">{post.description}</p>
                </div>
                <Link
                  href={`/blogs/${post.id}`}
                  className="relative group overflow-hidden flex items-center gap-4 rounded-2xl px-4 py-2 w-48 cursor-pointer font-bold bg-white text-black transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-800 ease-out z-0"></span>
                  <FaArrowAltCircleRight className="text-xl z-10 transition-all duration-300 group-hover:text-white" />
                  <p className="z-10 transition-all duration-300 group-hover:text-white">
                    Detail
                  </p>
                </Link>
              </article>
            </div>
          ))}
        </ul>
      )}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        categoryId={categoryName} // ya categoryName ya da id buraya uygun şekilde ver
      />
    </div>
  );
}
