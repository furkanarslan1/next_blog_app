"use client";

import { useState } from "react";

import Last from "./last/Last";
import Popular from "./popular/Popular";
import MostCommented from "./mostCommented/MostCommented";

export default function Aside() {
  const [activeTab, setActiveTab] = useState<"Commented" | "Last" | "Popular">(
    "Commented"
  );
  return (
    <div className=" border-1 border-slate-400 p-4 rounded-md shadow-white shadow-lg h-[500px] overflow-hidden text-sm md:text-md">
      <div>
        <header className="flex items-center gap-1 justify-center font-bold divide-x-2 border-b-1 pb-3 ">
          {["Commented", "Last", "Popular"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as "Commented" | "Last" | "Popular")
              }
              className={`px-2 cursor-pointer text-[12px] md:text-lg ${
                activeTab === tab
                  ? "bg-white px-4 py-2 rounded-lg text-black"
                  : "text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </header>
        <div className="mt-4">
          {activeTab === "Commented" && <MostCommented />}
        </div>
        <div className="mt-4">{activeTab === "Last" && <Last />}</div>
        <div className="mt-4">{activeTab === "Popular" && <Popular />}</div>
      </div>
    </div>
  );
}
