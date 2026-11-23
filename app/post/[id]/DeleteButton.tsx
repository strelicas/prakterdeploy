'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setIsDeleting(false);
      alert('Gagal menghapus post.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-danger"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
