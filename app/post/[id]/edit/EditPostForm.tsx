'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EditPostFormProps {
  id: number;
  initialTitle: string;
  initialContent: string;
}

export default function EditPostForm({
  id,
  initialTitle,
  initialContent,
}: EditPostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      setIsSaving(false);
      alert('Gagal memperbarui post.');
      return;
    }

    router.push(`/post/${id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <Link href={`/post/${id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
