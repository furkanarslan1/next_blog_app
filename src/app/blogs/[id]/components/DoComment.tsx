"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  content: string;
};
export default function DoComment({ postId }: { postId: number }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: { content: string }) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content: data.content, postId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-6">
      <Textarea
        {...register("content", {
          required: "Comment is required",
          minLength: { value: 3, message: "Comment at least 3 character" },
        })}
        placeholder="Write a comment..."
        className="md:text-lg"
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="border-1 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer md:text-xl"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
