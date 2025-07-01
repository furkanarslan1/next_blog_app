"use client";

import { useauthStore } from "@/lib/stores/authStore";
import { useEffect } from "react";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  avatarUrl: string | null;
};

interface Props {
  user: User;
}

export default function UserInitializer({ user }: Props) {
  const setUser = useauthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
