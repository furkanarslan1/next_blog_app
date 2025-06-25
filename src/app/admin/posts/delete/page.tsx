"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface deletePost {
  id: number;
  title: string;
  imageUrl?: string;
}

export default function AdminDeletePage() {
  const [posts, setPosts] = useState<deletePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
      alert("Deleted");
    } else {
      alert("Unsuccesfull");
    }
  }
  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-14 text-sm md:text-lg">
      <h1 className="text-center font-extrabold text-2xl border-b-1 pb-6">
        Delete Posts
      </h1>
      <ul className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-6 mt-8 p-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-5 border-1 rounded-4xl h-[200px] md:h-[400px] w-full p-8 cursor-pointer hover:shadow-white hover:shadow-2xl transition-all duration-500"
          >
            {post.imageUrl ? (
              <div className="relative w-full h-full ">
                <Image
                  src={post.imageUrl}
                  fill
                  className="object-cover object-center rounded-2xl"
                  alt={post.title}
                />
              </div>
            ) : (
              <span>Resim yok</span>
            )}
            <span>{post.title}</span>
            <button
              className="bg-red-500 cursor-pointer px-4 py-2 text-white rounded-2xl hover:text-red-500 hover:bg-white transition-all duration-300"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
