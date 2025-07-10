"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";

interface PostLikeProps {
  username: string;
  postId: number;
  liked: boolean;
  initialLikeCount: number;
}

export default function PostLike({
  username,
  postId,
  liked: initialLiked,
  initialLikeCount,
}: PostLikeProps) {
  const [postLiked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `/api/users/${username}/likePost/${postId}`,
        {
          method: postLiked ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setLiked(!postLiked);

        setLikeCount((prev) => prev + (postLiked ? -1 : 1));
      } else {
        console.error("Failed to toggle like");
        alert("Failed to update like status.");
      }
    } catch (error) {
      console.error("Error toggling like", error);
      alert("An error occurred while updating like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      aria-label={postLiked ? "Unlike post" : "Like post"}
      className="flex items-center gap-2 text-white hover:opacity-80 cursor-pointer"
    >
      {postLiked ? (
        <FaHeart size={20} color="red" />
      ) : (
        <IoIosHeartEmpty size={22} />
      )}
      <span>{likeCount}</span>
    </button>
  );
}
