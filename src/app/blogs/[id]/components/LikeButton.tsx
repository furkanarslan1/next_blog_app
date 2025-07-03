"use client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";

interface LikeButtonProps {
  commentId: number;
  liked: boolean;
}

export default function LikeButton({
  commentId,
  liked: initialLiked,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setLiked(!liked);
      } else {
        console.error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      aria-label={liked ? "Unlike comment" : "Like comment"}
      className="flex items-center gap-1 text-black hover:opacity-80 cursor-pointer"
    >
      {liked ? <FaHeart size={20} /> : <IoIosHeartEmpty size={20} />}
      <span>{liked ? "Liked" : "Like"}</span>
    </button>
  );
}
