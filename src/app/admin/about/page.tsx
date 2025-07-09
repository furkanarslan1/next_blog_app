// "use client";
// import React, { useState } from "react";

// export default function AdminAboutPage() {
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!imageFile) return alert("İmage not upload");

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result;
//       const res = await fetch("/api/about", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           aboutImageBase64: base64Image,
//           aboutTitle: title,
//           abotText: text,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("About context saved");
//       } else {
//         alert("Error" + data.message);
//       }
//     };
//     reader.readAsDataURL(imageFile);
//   }

//   return <div>page</div>;
// }

"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  aboutTitle: z.string().min(3, {
    message: "Title must be at least 3 character.",
  }),
  aboutText: z.string().min(10, {
    message: "Text must be at least 3 character.",
  }),
  aboutImage: z
    .instanceof(File, { message: "Image file don't uploaded" })
    .refine((file) => file.size > 0, {
      message: "File not be empty.",
    }),
});

type AboutFormType = z.infer<typeof formSchema>;

export default function AdminAboutPage() {
  const form = useForm<AboutFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutTitle: "",
      aboutText: "",
      aboutImage: undefined as unknown as File,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: AboutFormType) => {
    setIsLoading(true);

    // ✅ base64'e çevirme işlemi
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aboutTitle: values.aboutTitle,
          aboutText: values.aboutText,
          aboutImageBase64: base64Image,
        }),
      });

      setIsLoading(false);

      if (res.ok) {
        alert("About saved .");
        form.reset();
      } else {
        alert("Something went wrong.");
      }
    };

    reader.readAsDataURL(values.aboutImage);
  };

  return (
    <div className="max-w-7xl lg:w-4xl mx-auto mt-10 p-6 bg-transparent  rounded">
      <h2 className="text-2xl font-bold mb-6 text-center border-b-1 pb-4">
        Add About Context
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="aboutTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    className="md:text-lg"
                    placeholder="About Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aboutText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Text</FormLabel>
                <FormControl>
                  <Textarea
                    className="md:text-lg"
                    placeholder="About Text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aboutImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black font-bold md:text-2xl  p-5 cursor-pointer hover:text-white hover:bg-black border-white border-1 rounded-xl w-full transition-all duration-300 "
          >
            {isLoading ? "Loading..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
