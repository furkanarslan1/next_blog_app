"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useauthStore } from "@/lib/stores/authStore";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useauthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Checking authentication...
      </p>
    );
  }

  return <>{children}</>;
}
