// app/admin/posts/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  content: string;
  imageFile: FileList;
};

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (data.imageFile && data.imageFile[0]) {
        const file = data.imageFile[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Resim yüklenemedi");
        }

        const uploaded = await res.json();
        imageUrl = uploaded.secure_url;
      }

      // Yeni post oluştur
      const slug = data.title.trim().toLowerCase().replace(/\s+/g, "-");
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          imageUrl,
          slug,
        }),
      });

      reset();
      router.push("/blogs"); // yönlendirme
    } catch (error: any) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Yeni Blog Yazısı</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: "Başlık gerekli" })}
          placeholder="Başlık"
          className="w-full border p-2"
        />

        <textarea
          {...register("content", { required: "İçerik gerekli" })}
          placeholder="İçerik"
          className="w-full border p-2 min-h-48"
        />

        <input
          {...register("imageFile")}
          type="file"
          accept="image/*"
          className="w-full border p-2"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Yükleniyor..." : "Yayınla"}
        </button>
      </form>
    </div>
  );
}
