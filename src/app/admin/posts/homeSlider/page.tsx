"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface homeSlider {
  id: number;
  imageUrl?: string;
  title: string;
}

export default function AdminHomeSlider() {
  const [posts, setPosts] = useState<homeSlider[]>([]);
  const [selecetedOrder, setSelecetedOrder] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToHomeSlider = async (postId: number, order: number) => {
    try {
      const res = await fetch("/api/home_slider", {
        method: "POST",
        body: JSON.stringify({ postId, order }),
      });
      if (!res.ok) throw new Error("unsuccesfull");

      alert(`Post ${postId} added to slider at order ${order}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="px-14 text-sm md:text-lg">
      <h1 className="text-center font-extrabold text-2xl border-b-1 pb-6">
        Home Slider
      </h1>
      <ul className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-6 mt-8 p-4 gap-4">
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
            <div className="flex items-center gap-4">
              <button
                className="bg-white cursor-pointer text-sm px-6 py-2 font-bold text-black rounded-2xl hover:opacity-80  transition-all duration-300"
                onClick={() =>
                  addToHomeSlider(post.id, selecetedOrder[post.id] || 1)
                }
              >
                Add
              </button>
              <select
                className="bg-black"
                value={selecetedOrder[post.id]}
                onChange={(e) =>
                  setSelecetedOrder((prev) => ({
                    ...prev,
                    [post.id]: Number(e.target.value),
                  }))
                }
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}.Slide
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
