"use client";

import { useEffect } from "react";
import { useauthStore } from "@/lib/stores/authStore";

export default function AppInit({ children }: { children: React.ReactNode }) {
  const setUser = useauthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.log("Auth init error:", err);
      }
    };

    fetchUser();
  }, [setUser]);

  return <>{children}</>;
}
