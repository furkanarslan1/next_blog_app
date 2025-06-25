import Image from "next/image";
import Link from "next/link";

export default async function BlogsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Postlar yüklenemedi");
  }

  const posts = await res.json();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {posts.map((post: any) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <article className="h-[400px] overflow-hidden text-sm md:text-xl border p-6 rounded-md transition-all duration-500 hover:shadow-[0_0_15px_2px_white] shadow-white flex flex-col items-center gap-4">
              <div className="relative h-[200px] w-full">
                <Image
                  src={post.image || "/blog.jpg"}
                  alt="blog image"
                  fill
                  className="object-cover object-center rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.content}</p>
              </div>

              <Link
                href="/"
                className="px-4 py-2 bg-white rounded-2xl text-black cursor-pointer hover:opacity-60 transition-all duration-300"
              >
                Detail
              </Link>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
