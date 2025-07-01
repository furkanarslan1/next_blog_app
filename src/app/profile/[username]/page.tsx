"use client";

import { useauthStore } from "@/lib/stores/authStore";

export default function ProfilePage() {
  const user = useauthStore((state) => state.user);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Profil: {user.firstName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
