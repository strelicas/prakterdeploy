import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return NextResponse.json(allPosts);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();

  // Validate the input
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const newPost = await db.insert(posts).values({ title, content }).returning();
  revalidateTag('posts', 'max');
  return NextResponse.json(newPost, { status: 201 });
}