import Image from "next/image";
import React from "react";

import LikeButton from "./LikeButton";
interface Comment {
  id: number;
  content: string;
  user: {
    username: string;
    avatarUrl: string | null;
  };
  likedComments: boolean;
}

interface Props {
  post: Comment[];
}
export default function Comments({ post }: Props) {
  return (
    <div>
      {post.length === 0 ? (
        <p>There is no comment yet</p>
      ) : (
        <div className="space-y-4">
          {post.map((comment) => (
            <div
              key={comment.id}
              className="border p-3 rounded-md bg-slate-300 shadow-sm text-black flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4 justify-center ">
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 ">
                    {comment.user.avatarUrl && (
                      <Image
                        src={comment.user.avatarUrl}
                        fill
                        alt={comment.user.username}
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                  <p className="font-extrabold">{comment.user.username}</p>
                </div>
                <p>
                  {comment.content.length > 50
                    ? comment.content.slice(0, 51) + "..."
                    : comment.content}
                </p>
              </div>
              <LikeButton
                commentId={comment.id}
                liked={comment.likedComments}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
