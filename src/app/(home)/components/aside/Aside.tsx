"use client";

import { useState } from "react";
import Tops from "./tops/Tops";
import Last from "./last/Last";
import Popular from "./popular/Popular";

export default function Aside() {
  const [activeTab, setActiveTab] = useState<"Tops" | "Last" | "Popular">(
    "Tops"
  );
  return (
    <div className=" border-1 border-slate-400 p-4 rounded-md shadow-white shadow-lg h-[500px] overflow-hidden text-sm md:text-md">
      <div>
        <header className="flex items-center gap-4 justify-center font-bold divide-x-2 border-b-1 pb-3 ">
          {["Tops", "Last", "Popular"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "Tops" | "Last" | "Popular")}
              className={`px-4 cursor-pointer ${
                activeTab === tab
                  ? "bg-white px-4 py-2 rounded-lg text-black"
                  : "text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </header>
        <div className="mt-4">{activeTab === "Tops" && <Tops />}</div>
        <div className="mt-4">{activeTab === "Last" && <Last />}</div>
        <div className="mt-4">{activeTab === "Popular" && <Popular />}</div>
      </div>
    </div>
  );
}
