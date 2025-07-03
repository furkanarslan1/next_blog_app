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

  const prompt = `Bu bir blog yazısı: Başlık: ${post?.title} İçerik: ${post?.content} Kullanıcının bu blog hakkında bir sorusu var:
Soru: ${question}  Bu soruya, sadece yukarıdaki blog içeriğini kullanarak net, açık ve dostça bir şekilde cevap ver.`;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  const answer = response.choices[0].message.content;
  return NextResponse.json({ answer });
}
