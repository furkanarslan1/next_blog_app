import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import { getUserFromToken } from "@/lib/aut";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
  return (
    <div className="flex">
      <aside className="px-4">
        <AdminSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
