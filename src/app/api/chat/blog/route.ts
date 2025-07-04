import { getTokenFromCookies, getUserFromToken } from "@/lib/aut";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { question, postId } = await req.json();

  //who is user? take ID

  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  //delete old records(old  1 day)

  await prisma.blogQuestion.deleteMany({
    where: {
      createdAt: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    },
  });

  // do control ask of user today

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const questionCount = await prisma.blogQuestion.count({
    where: { userId, createdAt: { gte: today } },
  });

  if (questionCount >= 3) {
    return NextResponse.json(
      { error: "You have reached the daily limit of 3 question" },
      { status: 429 }
    );
  }

  // take blog content
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

  //add ask record to db

  await prisma.blogQuestion.create({
    data: { userId, postId, question },
  });
  return NextResponse.json({ answer });
}
