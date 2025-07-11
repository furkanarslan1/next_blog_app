import clsx from "clsx";
import Link from "next/link";
import React from "react";
import HeaderNav from "./HeaderNav";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="p-4 max-w-7xl mx-auto flex  gap-4 ">
      <header className="flex flex-col items-center  gap-4 mb-4  ">
        <HeaderNav username={username} />
      </header>
      <main>{children}</main>
    </div>
  );
}
