// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface homeSlider {
//   id: number;
//   imageUrl?: string;
//   description: string;
//   title: string;
// }

// export default function Swipper() {
//   const [posts, setPosts] = useState<homeSlider[]>([]);

//   useEffect(() => {
//     fetch("/api/home_slider")
//       .then((res) => res.json())
//       .then((data) => (console.log(data), setPosts(data)))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="text-sm   ">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 9000 }}
//       >
//         {posts &&
//           posts.map((post) => (
//             <SwiperSlide key={post.id} className="relative  ">
//               <Link
//                 href={`/blogs/${post.id}`}
//                 className="relative h-screen  w-full overflow-hidden"
//               >
//                 <div className="relative  w-full h-96 md:h-[600px]">
//                   {post.imageUrl ? (
//                     <Image
//                       src={post.imageUrl}
//                       alt="Blog image"
//                       fill
//                       priority={true}
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className="object-cover object-center   rounded-md"
//                     />
//                   ) : (
//                     <Image
//                       src="/blog.jpg"
//                       alt="Blog image"
//                       fill
//                       priority={true}
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className="object-cover object-center   rounded-md"
//                     />
//                   )}

//                   <div className="absolute bottom-10 p-4 z-10">
//                     <div className="flex flex-col  gap-4">
//                       <h5 className="underline font-bold text-sm md:text-lg">
//                         {post.title}
//                       </h5>
//                       <p className="text-sm">{post.description}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute inset-0 bg-black/50 "></div>
//               </Link>
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </div>
//   );
// }

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface homeSlider {
  id: number;
  imageUrl?: string;
  description: string;
  title: string;
}

export default function Swipper() {
  const [posts, setPosts] = useState<homeSlider[]>([]);

  useEffect(() => {
    fetch("/api/home_slider")
      .then((res) => res.json())
      .then((data) => (console.log(data), setPosts(data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-sm overflow-hidden max-w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 9000 }}
      >
        {posts &&
          posts.map((post) => (
            <SwiperSlide key={post.id} className="relative">
              <Link
                href={`/blogs/${post.id}`}
                className="relative block w-full h-[70vh] sm:h-[60vh] md:h-[80vh] overflow-hidden rounded-md"
              >
                <div className="relative w-full h-full max-h-[80vh]">
                  <Image
                    src={post.imageUrl || "/blog.jpg"}
                    alt="Blog image"
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    className="object-cover object-center rounded-md"
                  />

                  {/* Bilgi kutusu */}
                  <div className="absolute bottom-10 p-4 z-10 text-white">
                    <div className="flex flex-col gap-4 bg-black/50 p-4 rounded">
                      <h5 className="underline font-bold text-sm md:text-lg">
                        {post.title}
                      </h5>
                      <p className="text-sm">{post.description}</p>
                    </div>
                  </div>

                  {/* Siyah arka plan filtresi */}
                  <div className="absolute inset-0 bg-black/30 z-0"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
