"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  content: string;
  imageFile: FileList;
  categoryId: string;
  like_count: number;
  description: string;
  tags: string;
  keywords: string;
  metaDescription: string;
  slug?: string; // optional
};

interface Category {
  name: string;
  id: number;
}

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err.message));
  }, []);

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

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!res.ok) throw new Error("Resim yüklenemedi");
        const uploaded = await res.json();
        imageUrl = uploaded.secure_url;
      }

      const likeCount = Number(data.like_count) || 0;
      const slug = data.slug?.trim()
        ? data.slug.trim().toLowerCase().replace(/\s+/g, "-")
        : data.title.trim().toLowerCase().replace(/\s+/g, "-");

      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          imageUrl,
          slug,
          categoryId: data.categoryId ? Number(data.categoryId) : null,
          likeCount,
          description: data.description,
          tags: data.tags,
          keywords: data.keywords,
          metaDescription: data.metaDescription,
        }),
      });

      reset();
      router.push("/blogs");
    } catch (error: any) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">New Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
          placeholder="Title"
          className="w-full border p-2 rounded-lg"
        />

        {/* Content */}
        <textarea
          {...register("content", { required: true, minLength: 10 })}
          placeholder="Content"
          className="w-full border p-2 min-h-48 rounded-lg"
        />

        {/* Optional Slug */}
        <input
          {...register("slug")}
          placeholder="Custom slug (optional)"
          className="w-full border p-2 rounded-lg"
        />

        {/* Description */}
        <input
          {...register("description", { required: true, minLength: 10 })}
          placeholder="Description"
          className="w-full border p-2 rounded-lg"
        />

        {/* SEO Fields */}
        <input
          {...register("tags")}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded-lg"
        />
        <input
          {...register("keywords")}
          placeholder="Keywords (comma separated)"
          className="w-full border p-2 rounded-lg"
        />
        <input
          {...register("metaDescription")}
          placeholder="Meta Description"
          className="w-full border p-2 rounded-lg"
        />

        {/* Image */}
        <input
          {...register("imageFile")}
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded-lg"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto mt-2 rounded"
          />
        )}

        {/* Like Count */}
        <input
          {...register("like_count")}
          type="number"
          placeholder="Like count"
          className="w-full border p-2 rounded-lg"
        />

        {/* Category */}
        <select
          className="block bg-black border p-2 rounded-lg"
          {...register("categoryId")}
        >
          {categories &&
            categories.map((cat) => <option value={cat.id}>{cat.name}</option>)}
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white w-full hover:shadow-white hover:shadow-2xl text-black p-2 rounded transition-all disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}
