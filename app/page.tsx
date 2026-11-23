import Link from 'next/link';
import { cacheTag } from 'next/cache';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';

async function getPosts() {
  "use cache";
  cacheTag('posts');
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

export default async function Home() {
  const allPosts = await getPosts();

  return (
    <main className="container mt-4">
      <h1>Blog Posts</h1>
      <Link href="/create" className="btn btn-primary mb-3">
        Create Post
      </Link>
      {allPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="list-group">
          {allPosts.map((post) => (
            <li key={post.id} className="list-group-item">
              <Link href={`/post/${post.id}`}>
                {post.title}
              </Link>
              {post.createdAt && (
                <span className="text-muted float-end">
                  {new Date(post.createdAt).toLocaleDateString('id-ID')}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}