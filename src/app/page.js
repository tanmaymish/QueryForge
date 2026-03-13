'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Basic redirect for now, in a real app check cookie state
    router.push('/login');
  }, [router]);

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Aura Search
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '20px' }}>Loading your personal assistant...</p>
      </div>
    </div>
  );
}
