import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HomeBlogitemsProps {
  image: string;
  header: string;
  p: string;
}

export default function HomeBlogitem({ image, header, p }: HomeBlogitemsProps) {
  return (
    <div>
      <Link
        href="/"
        className="flex flex-col md:flex-row  md:items-start gap-4  md:gap-8 p-4 border-slate-400  border-1 rounded-xl mt-6 shadow-md shadow-white"
      >
        <div className="relative w-full h-[100px] md:h-[150px] md:w-[350px]">
          <Image
            fill
            src={image}
            alt="blog image"
            className="object-contain roundded-xl"
          />
        </div>
        <div className="space-y-4 text-sm">
          <h6 className="font-bold md:text-xl">{header}</h6>
          <p>{p}</p>
        </div>
      </Link>
    </div>
  );
}
