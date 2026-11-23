import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json(allPosts);
  } catch (err) {
    console.error('GET /api/posts error:', err);
    const message = err instanceof Error ? err.message : 'Database error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const newPost = await db.insert(posts).values({ title, content }).returning();
    revalidateTag('posts', 'max');
    revalidatePath('/');
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error('POST /api/posts error:', err);
    const message = err instanceof Error ? err.message : 'Database error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
