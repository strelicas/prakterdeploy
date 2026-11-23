import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import DeleteButton from './DeleteButton';

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
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
    <>
      <h1>{post.title}</h1>
      {post.createdAt && (
        <p className="text-muted">
          {new Date(post.createdAt).toLocaleDateString('id-ID')}
        </p>
      )}
      <p className="mt-3" style={{ whiteSpace: 'pre-wrap' }}>
        {post.content}
      </p>
      <div className="d-flex gap-2 mt-4">
        <Link href="/" className="btn btn-secondary">
          Back
        </Link>
        <DeleteButton id={post.id} />
      </div>
    </>
  );
}

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container mt-4">
      <Suspense fallback={<p>Loading post...</p>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}
