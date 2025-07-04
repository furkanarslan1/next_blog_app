"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import { Button } from "@/components/ui/button";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import clsx from "clsx";

const lowlight = createLowlight();

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Start typing your post...",
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "tiptap  focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none text-white bg-black min-h-[200px] p-4 rounded placeholder:text-white",
      },
    },
  });
  if (!editor) return null;

  return (
    <div className="space-y-2 border-1 rounded-2xl p-2 bg-w">
      <div className="flex flex-wrap gap-2 bg-gray-900 p-2 rounded-2xl">
        <Button
          //   className="hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("bold")
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
          //   variant="default"
        >
          Bold
        </Button>
        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("underline")
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant="default"
        >
          Underline
        </Button>
        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("italic")
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant="default"
        >
          Italic
        </Button>
        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("heading", { level: 1 })
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant="default"
        >
          H1
        </Button>
        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("heading", { level: 2 })
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant="default"
        >
          H2
        </Button>

        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("link")
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() => {
            let link = prompt("Enter URL:");

            if (link) {
              // Eğer link http veya https ile başlamıyorsa, ekle
              if (!/^https?:\/\//i.test(link)) {
                link = "https://" + link;
              }

              editor.chain().focus().setLink({ href: link }).run();
            }
          }}
          variant="default"
        >
          Link
        </Button>

        <Button
          onClick={() => {
            let imageUrl = prompt("Image URL:");

            if (imageUrl) {
              if (!/^https?:\/\//i.test(imageUrl)) {
                imageUrl = "https://" + imageUrl;
              }

              editor.chain().focus().setImage({ src: imageUrl }).run();
            }
          }}
          variant="default"
        >
          Image
        </Button>
        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("codeBlock")
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant="default"
        >
          Code
        </Button>
        <Button
          className={clsx(
            "transition-colors duration-300 cursor-pointer",
            editor.isActive("blockquote")
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          )}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant="default"
        >
          Quote
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
