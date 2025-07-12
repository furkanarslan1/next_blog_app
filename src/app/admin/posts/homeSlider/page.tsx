// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface homeSlider {
//   id: number;
//   imageUrl?: string;
//   title: string;
// }

// export default function AdminHomeSlider() {
//   const [posts, setPosts] = useState<homeSlider[]>([]);
//   const [selecetedOrder, setSelecetedOrder] = useState<{
//     [key: number]: number;
//   }>({});

//   useEffect(() => {
//     fetch("/api/posts")
//       .then((res) => res.json())
//       .then((data) => setPosts(data.posts))
//       .catch((err) => console.error(err));
//   }, []);

//   const addToHomeSlider = async (postId: number, order: number) => {
//     try {
//       const res = await fetch("/api/home_slider", {
//         method: "POST",
//         body: JSON.stringify({ postId, order }),
//       });
//       if (!res.ok) throw new Error("unsuccesfull");

//       alert(`Post ${postId} added to slider at order ${order}`);
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="px-1 text-sm md:text-lg overflow-x-hidden">
//       <h1 className="text-center font-extrabold text-2xl border-b-1 pb-2">
//         Home Slider
//       </h1>
//       <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-4">
//         {Array.isArray(posts) &&
//           posts.map((post) => (
//             <li
//               key={post.id}
//               className="flex flex-col gap-1 border-1 rounded-4xl h-[200px] md:h-[400px] w-full  cursor-pointer hover:shadow-white hover:shadow-2xl transition-all duration-500"
//             >
//               {post.imageUrl ? (
//                 <div className="relative aspect-[4/2] ">
//                   <Image
//                     src={post.imageUrl}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     className="object-cover object-center rounded-2xl"
//                     alt={post.title}
//                   />
//                 </div>
//               ) : (
//                 <span>No Image</span>
//               )}
//               <span>{post.title}</span>
//               <div className="flex items-center ">
//                 <button
//                   className="bg-white cursor-pointer text-sm font-bold text-black rounded-2xl hover:opacity-80  transition-all duration-300"
//                   onClick={() =>
//                     addToHomeSlider(post.id, selecetedOrder[post.id] || 1)
//                   }
//                 >
//                   Add
//                 </button>
//                 <select
//                   className="bg-black"
//                   value={selecetedOrder[post.id]}
//                   onChange={(e) =>
//                     setSelecetedOrder((prev) => ({
//                       ...prev,
//                       [post.id]: Number(e.target.value),
//                     }))
//                   }
//                 >
//                   {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
//                     <option key={n} value={n}>
//                       {n}.Slide
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HomeSlider {
  id: number;
  imageUrl?: string;
  title: string;
}

export default function AdminHomeSlider() {
  const [posts, setPosts] = useState<HomeSlider[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error(err));
  }, []);

  // Default olarak post id'lerin order değerlerini 1 yapalım
  useEffect(() => {
    if (posts.length > 0) {
      const defaultOrders: { [key: number]: number } = {};
      posts.forEach((post) => {
        defaultOrders[post.id] = 1;
      });
      setSelectedOrder(defaultOrders);
    }
  }, [posts]);

  const addToHomeSlider = async (postId: number, order: number) => {
    try {
      const res = await fetch("/api/home_slider", {
        method: "POST",
        body: JSON.stringify({ postId, order }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Unsuccessful");

      alert(`Post ${postId} added to slider at order ${order}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Bir hata oluştu");
      }
    }
  };

  return (
    <div className="px-4 md:px-8 overflow-x-hidden">
      <h1 className="text-center font-extrabold text-2xl border-b border-white pb-4">
        Home Slider
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 border border-white rounded-3xl p-4 h-auto md:h-[400px] w-full cursor-pointer hover:shadow-white hover:shadow-lg transition-shadow duration-300"
            >
              {post.imageUrl ? (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 bg-gray-700 rounded-2xl text-white">
                  No Image
                </div>
              )}

              <h2 className="font-semibold text-lg truncate">{post.title}</h2>

              <div className="flex items-center gap-4 mt-auto">
                <button
                  className="bg-white text-black text-sm font-bold px-2 md:px-6 py-2 rounded-2xl hover:opacity-80 transition-opacity duration-300"
                  onClick={() =>
                    addToHomeSlider(post.id, selectedOrder[post.id])
                  }
                >
                  Add
                </button>
                <select
                  className="bg-black text-white px-3 py-2 rounded-2xl"
                  value={selectedOrder[post.id]}
                  onChange={(e) =>
                    setSelectedOrder((prev) => ({
                      ...prev,
                      [post.id]: Number(e.target.value),
                    }))
                  }
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}. Slide
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
