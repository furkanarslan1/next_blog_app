"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TiptapEditor from "./components/TiptapEditor";
import TagInput from "./components/TagInput";
import Image from "next/image";

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
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<FormData>();

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
    } catch (error) {
      console.log(error);
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
        {/* <textarea
          {...register("content", { required: true, minLength: 10 })}
          placeholder="Content"
          className="w-full border p-2 min-h-48 rounded-lg"
        /> */}
        <TiptapEditor
          value={watch("content") || ""}
          onChange={(val) => setValue("content", val)}
        />

        {/* Optional Slug */}
        {/* <input
          {...register("slug")}
          placeholder="Custom slug (optional)"
          className="w-full border p-2 rounded-lg"
        /> */}

        {/* Description */}
        <input
          {...register("description", { required: true, minLength: 10 })}
          placeholder="Description"
          className="w-full border p-2 rounded-lg"
        />

        {/* SEO Fields */}
        {/* <input
          {...register("tags")}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded-lg"
        /> */}

        <TagInput
          value={
            watch("tags")
              ?.split(",")
              .map((tag) => tag.trim())
              .filter(Boolean) || []
          }
          onChange={(val) => setValue("tags", val.join(","))}
        />
        <p className="text-sm text-gray-400">
          Type a word and press Enter to add it as a tag. Repeat for multiple
          tags.
        </p>

        {/* <input
          {...register("keywords")}
          placeholder="Keywords (comma separated)"
          className="w-full border p-2 rounded-lg"
        /> */}

        <TagInput
          value={
            watch("keywords")
              ?.split(",")
              .map((kw) => kw.trim())
              .filter(Boolean) || []
          }
          onChange={(val) => setValue("keywords", val.join(","))}
        />
        <p className="text-sm text-gray-400">
          Type a word and press Enter to add it as a tag. Repeat for multiple
          tags.
        </p>

        {/* <input
          {...register("metaDescription")}
          placeholder="Meta Description"
          className="w-full border p-2 rounded-lg"
        /> */}
        <textarea
          {...register("metaDescription", { maxLength: 160 })}
          placeholder="Meta description (max 160 characters)"
          className="w-full border p-2 rounded-lg"
          onChange={(e) => {
            const val = e.target.value;
            setValue("metaDescription", val.slice(0, 160));
          }}
        />
        <p className="text-sm text-gray-400">
          {watch("metaDescription")?.length || 0}
        </p>

        {/* Image */}
        <input
          {...register("imageFile")}
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded-lg"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            height={200}
            width={200}
            className="w-full object-cover h-auto mt-2 rounded"
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
        {/* <select
          className="block bg-black border p-2 rounded-lg"
          {...register("categoryId")}
        >
          {categories &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select> */}
        <select
          className="block bg-black border p-2 rounded-lg"
          {...register("categoryId", { required: true })}
        >
          <option value="">Choose category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white w-full font-bold cursor-pointer hover:bg-black hover:text-white border-1 hover:shadow-white hover:shadow-2xl text-black p-2 rounded transition-all disabled:bg-gray-400 mt-4 duration-300"
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}
