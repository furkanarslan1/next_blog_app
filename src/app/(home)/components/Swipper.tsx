"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function Swipper() {
  return (
    <div className="text-sm">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 9000 }}
      >
        <SwiperSlide className="relative ">
          <Link href="/" className="relative h-screen  w-full overflow-hidden">
            <div className="w-full h-120 md:h-140">
              <Image
                src="/blog.jpg"
                alt="Blog image"
                fill
                className="object-contain object-center   rounded-md"
              />

              <div className="absolute bottom-0 p-4 z-10">
                <div className="flex flex-col  gap-4">
                  <h5 className="text-amber-300 font-bold text-lg">Header</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum eos esse eaque expedita a labore modi dolor quos
                    tempore aut eius pariatur quibusdam harum, ad excepturi
                    omnis, est dicta ratione in. Recusandae voluptatibus autem
                    reiciendis, quasi pariatur necessitatibus placeat totam
                    inventore, eius asperiores minus rem ut debitis sit iusto
                    aliquam.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-black/50 "></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/" className="relative h-screen  w-full overflow-hidden">
            <div className="w-full h-120 md:h-140">
              <Image
                src="/blog.jpg"
                alt="Blog image"
                fill
                className="object-contain object-center   rounded-md"
              />

              <div className="absolute bottom-0 p-4 z-10">
                <div className="flex flex-col  gap-4">
                  <h5 className="text-amber-300 font-bold text-lg">Header</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum eos esse eaque expedita a labore modi dolor quos
                    tempore aut eius pariatur quibusdam harum, ad excepturi
                    omnis, est dicta ratione in. Recusandae voluptatibus autem
                    reiciendis, quasi pariatur necessitatibus placeat totam
                    inventore, eius asperiores minus rem ut debitis sit iusto
                    aliquam.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-black/50 "></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/" className="relative h-screen  w-full overflow-hidden">
            <div className="w-full h-120 md:h-140">
              <Image
                src="/blog.jpg"
                alt="Blog image"
                fill
                className="object-contain object-center   rounded-md"
              />

              <div className="absolute bottom-0 p-4 z-10">
                <div className="flex flex-col  gap-4">
                  <h5 className="text-amber-300 font-bold text-lg">Header</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum eos esse eaque expedita a labore modi dolor quos
                    tempore aut eius pariatur quibusdam harum, ad excepturi
                    omnis, est dicta ratione in. Recusandae voluptatibus autem
                    reiciendis, quasi pariatur necessitatibus placeat totam
                    inventore, eius asperiores minus rem ut debitis sit iusto
                    aliquam.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-black/50 "></div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
