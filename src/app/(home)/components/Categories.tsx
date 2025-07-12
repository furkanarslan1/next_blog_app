"use client";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function Categories() {
  const [category, setCategory] = useState<Category[]>([]);

  const gradientClasses = [
    { from: "from-orange-500", to: "to-orange-900" },
    { from: "from-red-500", to: "to-red-900" },
    { from: "from-blue-500", to: "to-blue-900" },
    { from: "from-green-500", to: "to-green-900" },
  ];

  const white = "to-white-50";

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="md:grid grid-cols-2 gap-6 hidden">
      {category.slice(0, 4).map((cat, index) => (
        <Link
          key={cat.id}
          href={`/category/${cat.name}`}
          className={`bg-gradient-to-r ${gradientClasses[index]?.from}  to-${white} w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:${gradientClasses[index]?.from} hover:${gradientClasses[index]?.to} transition-colors duration-500`}
        >
          {cat.name}
        </Link>
      ))}
      {/* 
      <Link
        href={"/categories"}
        className="flex items-center gap-4 bg-white text-black rounded-2xl px-4 py-2 max-w-40 cursor-pointer hover:opacity-80 transition-all duration-300"
      >
        <FaArrowAltCircleRight className="text-xl" />
        <span>Category</span>
      </Link> */}
      <Link
        href="/categories"
        className="relative group overflow-hidden flex items-center gap-4 rounded-2xl px-4 py-2 w-48 cursor-pointer font-bold bg-white text-black transition-all duration-300"
      >
        {/* Kayan siyah arkaplan efekti */}
        <span className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-800 ease-out z-0"></span>

        {/* İçerik */}
        <FaArrowAltCircleRight className="text-xl z-10 transition-all duration-300 group-hover:text-white" />
        <span className="z-10 transition-all duration-300 group-hover:text-white">
          Category
        </span>
      </Link>

      {/* <Link
        href="/healt"
        className="bg-gradient-to-r from-orange-500 orange-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-orange-500 hover:to-orange-900 transition-colors duration-500"
      >
        
      </Link>
      <Link
        href="/history"
        className="bg-gradient-to-r from-red-500 red-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-red-500 hover:to-red-900 transition-colors duration-500"
      >
   
      <Link
        href="/movie"
        className="bg-gradient-to-r from-blue-500 blue-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-blue-500 hover:to-blue-900 transition-colors duration-500"
      >
       
      </Link>

      <Link
        href="/tech"
        className="bg-gradient-to-r from-green-500 green-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-green-500 hover:to-green-900 transition-colors duration-500"
      >
        {category[0].name}
      </Link> */}
    </div>
  );
}
