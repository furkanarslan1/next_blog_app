"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useauthStore } from "@/lib/stores/authStore";

export default function ProtectedAdminPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useauthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/not-authorized");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center mt-10 text-gray-500">Checking access...</p>
    );
  }

  return <>{children}</>;
}
