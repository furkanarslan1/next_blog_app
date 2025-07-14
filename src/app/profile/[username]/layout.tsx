import React from "react";
import HeaderNav from "./HeaderNav";
import { getUserFromToken } from "@/lib/aut";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserFromToken();

  if (!user || user.username !== username) {
    return redirect("/login");
  }

  return (
    <div className="p-4 max-w-7xl mx-auto flex  gap-4 ">
      <header className="flex flex-col items-center  gap-4 mb-4  ">
        <HeaderNav username={username} />
      </header>
      <main>{children}</main>
    </div>
  );
}
