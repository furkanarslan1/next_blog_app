"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
interface LikeTypes {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

export default function UserLikes() {
  const [likes, setLikes] = useState<LikeTypes[]>([]);
  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    fetch(`/api/users/${username}/likePost`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  }, [username]);

  const handleUnlike = async (postId: number) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${username}/likePost/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLikes((prev) => prev.filter((like) => like.id !== postId));
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-hidden max-w-full">
      <h1 className="text-2xl font-bold text-center border-b-1 pb-2 mb-4">
        Your Liked Posts
      </h1>
      {likes.length === 0 ? (
        <div>There is no liked post</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  text-xs md:text-md">
          {likes.map((like) => (
            <div
              key={like.id}
              className="  p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2  rounded-2xl ">
                {like.imageUrl && (
                  <div className="relative h-20 w-20 shrink-0 rounded overflow-hidden">
                    <Image
                      src={like.imageUrl}
                      alt={like.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <p className="font-bold underline">
                    {like.title.length > 10
                      ? like.title.slice(0, 10)
                      : like.title}
                  </p>
                </div>
                <button
                  onClick={() => handleUnlike(like.id)}
                  className="text-lg md:text-2xl cursor-pointer hover:text-red-500 transition-all duration-400"
                >
                  <AiFillDislike />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
