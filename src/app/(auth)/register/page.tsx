"use client";
import { useauthStore } from "@/lib/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const [message, setMessage] = useState("");

  const router = useRouter();
  const user = useauthStore((state) => state.user);
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const onSubmit = async (data: RegisterFormData) => {
    setMessage("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Registration succesfull");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-white shadow-2xl ">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {["firstName", "lastName", "username", "email", "password"].map(
          (field) => (
            <div key={field}>
              <label className="block capitalize">{field}</label>
              <input
                {...register(field as keyof RegisterFormData)}
                className="border w-full p-2 rounded-xl"
                type={field === "password" ? "password" : "text"}
              />
              {errors[field as keyof RegisterFormData] && (
                <p className="text-sm text-red-500">
                  {errors[field as keyof RegisterFormData]?.message}
                </p>
              )}
            </div>
          )
        )}

        {message && <p className="text-sm text-blue-500">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black font-bold py-2 rounded-2xl hover:opacity-75 cursor-pointer"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
