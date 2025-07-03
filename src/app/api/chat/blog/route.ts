import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { question, postId } = await req.json();
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, content: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  const prompt = `This is a blog post: Title: ${post?.title} Content: ${post?.content} 
The user has a question about this blog post:
Question: ${question}  
Answer this question clearly, directly, and in a friendly manner using only the blog content above.`;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  const answer = response.choices[0].message.content;
  return NextResponse.json({ answer });
}
