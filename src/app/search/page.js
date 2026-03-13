'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (res.ok) {
                setResults(data.results || []);
            } else {
                setError(data.error || 'Search failed');
            }
        } catch (err) {
            setError('An error occurred during search.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', paddingLeft: '300px', paddingTop: '40px', paddingRight: '40px', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '1000px' }}>
                <header>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Semantic Search</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Ask anything across your indexed documents using natural language.</p>
                </header>

                <section>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px' }}>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="e.g. What were the key points in the project proposal?"
                            style={{ flex: 1, padding: '16px 20px', fontSize: '1.1rem' }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                </section>

                {error && (
                    <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)' }}>
                        {error}
                    </div>
                )}

                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {results.length > 0 ? (
                        results.map((res, index) => (
                            <div key={index} className="glass-card" style={{ padding: '24px', transition: 'var(--transition)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.2rem' }}>📄</span>
                                        <h3 style={{ fontSize: '1.1rem' }}>{res.fileName}</h3>
                                    </div>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        Match: {(res.score * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <p style={{
                                    color: 'var(--foreground)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    padding: '16px',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid var(--primary)'
                                }}>
                                    "...{res.text}..."
                                </p>
                                <div style={{ marginTop: '16px', display: 'flex', gap: '15px' }}>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Open Context</button>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>View Metadata</button>
                                </div>
                            </div>
                        ))
                    ) : !loading && query && (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                            No relevant passages found. Try rephrasing your search.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
