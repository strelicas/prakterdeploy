'use client';

import Link from 'next/link';

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container mt-4">
      <div className="alert alert-danger">
        <h4>Gagal memuat post</h4>
        <p className="mb-2">{error.message || 'Terjadi kesalahan pada server.'}</p>
        <div className="d-flex gap-2">
          <button onClick={() => reset()} className="btn btn-primary btn-sm">
            Coba Lagi
          </button>
          <Link href="/" className="btn btn-secondary btn-sm">
            Kembali ke Home
          </Link>
        </div>
      </div>
    </main>
  );
}
