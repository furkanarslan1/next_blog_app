import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";

export default async function About() {
  const about = await prisma.about.findFirst();
  if (!about) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold">About</h1>
        <p>There is no context yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl lg:w-6xl mx-auto py-12 px-4 border-2 border-white rounded-md ">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg md:text-2xl font-bold text-center border-b-1 border-white pb-3">
          {about.aboutTitle}
        </h1>

        <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto my-12">
          <Image
            src={about.aboutImage}
            alt={about.aboutTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="md:text-xl">{about.aboutText}</p>
        </div>
      </div>
    </div>
  );
}
