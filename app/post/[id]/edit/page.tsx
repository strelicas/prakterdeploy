import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import EditPostForm from './EditPostForm';

async function EditPostLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    notFound();
  }

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post) {
    notFound();
  }

  return (
    <EditPostForm
      id={post.id}
      initialTitle={post.title}
      initialContent={post.content}
    />
  );
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container mt-4">
      <h1>Edit Post</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <EditPostLoader params={params} />
      </Suspense>
    </main>
  );
}
