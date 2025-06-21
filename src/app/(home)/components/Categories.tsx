import Link from "next/link";
import React from "react";

export default function Categories() {
  return (
    <div className="md:grid grid-cols-2 gap-6 hidden ">
      <Link
        href="/healt"
        className="bg-gradient-to-r from-orange-500 orange-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-orange-500 hover:to-orange-900 transition-colors duration-500"
      >
        Health
      </Link>
      <Link
        href="/history"
        className="bg-gradient-to-r from-red-500 red-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-red-500 hover:to-red-900 transition-colors duration-500"
      >
        History
      </Link>
      <Link
        href="/movie"
        className="bg-gradient-to-r from-blue-500 blue-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-blue-500 hover:to-blue-900 transition-colors duration-500"
      >
        Movie
      </Link>

      <Link
        href="/tech"
        className="bg-gradient-to-r from-green-500 green-900 to-white-50 w-[200px] h-[200px] flex items-center justify-center font-bold rounded-md hover:from-green-500 hover:to-green-900 transition-colors duration-500"
      >
        Tech
      </Link>
    </div>
  );
}
