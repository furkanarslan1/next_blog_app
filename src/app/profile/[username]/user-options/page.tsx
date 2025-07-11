"use client";

import { useEffect, useState } from "react";
import { useauthStore } from "@/lib/stores/authStore";

export default function UserOptions() {
  const user = useauthStore((state) => state.user);
  const setUser = useauthStore((state) => state.setUser);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let avatarUrl = user?.avatarUrl;

    if (avatarFile) {
      avatarUrl = await toBase64(avatarFile);
    }

    const res = await fetch(`/api/users/${user?.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        email,
        password,
        avatarUrl,
      }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } else {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Update Profile</h2>

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Name"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Email"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
        className="border p-2 rounded w-full"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="New Password"
      />

      <button
        type="submit"
        className="bg-white text-black px-4 py-2 rounded-md font-bold hover:opacity-80  cursor-pointer"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
