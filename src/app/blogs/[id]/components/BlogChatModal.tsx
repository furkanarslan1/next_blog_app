"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next 13+ router
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";

interface BlogChatModalProps {
  postId: number;
  isLoggedIn: boolean;
}

export default function BlogChatModal({
  postId,
  isLoggedIn,
}: BlogChatModalProps) {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/chat/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, postId }),
      });

      const data = await res.json();
      if (res.ok) {
        setAnswer(data.answer);
        setQuestion("");
      } else {
        setAnswer("An error occurred. Please try again.");
      }
    } catch {
      setAnswer("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      return;
    }
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full  bg-white text-black hover:bg-black hover:text-white hover:border-1 hover:border-white transition-all duration-300 cursor-pointer">
          Ask a question about this blog
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-black">
        <h2 className="text-lg font-semibold mb-2">Curious about this blog?</h2>

        <Textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px] bg-black text-white"
        />

        <Button
          onClick={handleAsk}
          disabled={loading}
          className="mt-2 w-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin h-4 w-4" />
              Answering...
            </span>
          ) : (
            "Send Question"
          )}
        </Button>

        {answer && (
          <div className="mt-4 bg-black text-white p-3 rounded text-sm whitespace-pre-wrap">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
