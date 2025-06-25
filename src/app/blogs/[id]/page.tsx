// app/blogs/[id]/page.tsx

import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) return notFound();

  const post = await prisma.post.findUnique({ where: { id: numericId } });

  if (!post) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold border-b-3 pb-3 text-center">
        {post.title}
      </h1>
      {post.imageUrl && (
        <div className="relative w-full aspect-square ">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <p>{post.content}</p>
    </div>
  );
}
