import React from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="px-4">
        <AdminSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
