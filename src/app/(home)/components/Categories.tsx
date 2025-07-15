import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import React from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoriesProps {
  category: Category[];
}

export default function Categories({ category }: CategoriesProps) {
  const gradientClasses = [
    { from: "from-orange-500", to: "to-orange-900" },
    { from: "from-red-500", to: "to-red-900" },
    { from: "from-blue-500", to: "to-blue-900" },
    { from: "from-green-500", to: "to-green-900" },
  ];

  const white = "to-white-50";

  return (
    <div className="md:grid grid-cols-2 gap-6 hidden">
      {category?.slice(0, 4).map((cat, index) => (
        <Link
          key={cat.id}
          href={`/category/${cat.name}`}
          className={`bg-gradient-to-r ${gradientClasses[index]?.from}  to-${white} w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:${gradientClasses[index]?.from} hover:${gradientClasses[index]?.to} transition-colors duration-500`}
        >
          {cat.name}
        </Link>
      ))}

      <Link
        href="/categories"
        className="relative group overflow-hidden flex items-center gap-4 rounded-2xl px-4 py-2 w-48 cursor-pointer font-bold bg-white text-black transition-all duration-300"
      >
        {/* Kayan siyah arkaplan efekti */}
        <span className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-800 ease-out z-0"></span>

        {/* İçerik */}
        <FaArrowAltCircleRight className="text-xl z-10 transition-all duration-300 group-hover:text-white" />
        <span className="z-10 transition-all duration-300 group-hover:text-white">
          Categories
        </span>
      </Link>
    </div>
  );
}
