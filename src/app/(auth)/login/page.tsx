"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useauthStore } from "@/lib/stores/authStore";

const loginSchema = z.object({
  email: z.string().email("Please enter valid e-mail"),
  password: z.string().min(6, "Password must be at least 6 characters. "),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const user = useauthStore((state) => state.user);
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || "Login is unsuccesfull");
      }
      console.log("Login is succesfull", result);

      useauthStore.getState().setUser(result.user);
      router.push("/");
    } catch (err) {
      console.log(err);
      setErrorMsg("unsuccesfull");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20  p-6 border rounded-2xl shadow-white shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border p-2 w-full rounded-2xl"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="border p-2 w-full rounded-2xl"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white  text-black font-bold px-4 py-2 rounded w-full hover:opacity-80 cursor-pointer "
        >
          {isSubmitting ? "logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
