"use client";

import { useState } from "react";

import { useauthStore } from "@/lib/stores/authStore";

export default function UserOptions() {
  const user = useauthStore((state) => state.user);
  const setUser = useauthStore((state) => state.setUser);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/users/${user?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      alert("Profie updated succesfully!");
    } else {
      alert("Somethings went wrong");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Update Profile</h2>

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="İsim"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Email"
      />

      <button
        type="submit"
        className="bg-white text-black px-4 py-2 rounded-md font-bold hover:opacity-80 shadow-white shadow-2xl cursor-pointer"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
