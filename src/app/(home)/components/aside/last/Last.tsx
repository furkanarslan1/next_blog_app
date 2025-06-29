"use client";

import React, { useEffect, useState } from "react";

interface Blog {
  id: number;
  imageUrl?: string;
  description: string;
  title: string;
}

export default function Last() {
  const [posts, setPosts] = useState<Blog[]>([]);
  useEffect(() => {
    fetch("/api/posts/last")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="border-b-1 pb-3">
            <h6 className="font-semibold">{post.title}</h6>
            <p>{post.description}</p>
          </div>
        ))}
    </div>
  );
}
