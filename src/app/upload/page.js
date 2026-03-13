'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [message, setMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setStatus('uploading');
        setMessage('Parsing and indexing document...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(`Success! Indexed ${data.chunks} segments from ${file.name}`);
                setFile(null);
            } else {
                setStatus('error');
                setMessage(data.error || 'Upload failed');
            }
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'An error occurred during indexing.');
        }
    };

    return (
        <div style={{ display: 'flex', paddingLeft: '300px', paddingTop: '40px', paddingRight: '40px', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px' }}>
                <header>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Upload Center</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Add new documents to your knowledge base. Supported types: PDF, DOCX, TXT, MD.</p>
                </header>

                <section className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div
                            style={{
                                border: '2px dashed var(--card-border)',
                                borderRadius: '16px',
                                padding: '60px 20px',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                background: file ? 'rgba(99, 102, 241, 0.05)' : 'transparent'
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                setFile(e.dataTransfer.files[0]);
                            }}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <span style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}>
                                {file ? '📄' : '☁️'}
                            </span>
                            <p style={{ fontWeight: '600' }}>
                                {file ? file.name : 'Click or drag file to upload'}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                                Limit 10MB per file
                            </p>
                            <input
                                id="file-input"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                        {status === 'idle' && (
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={!file}
                                style={{ alignSelf: 'center', opacity: !file ? 0.5 : 1 }}
                            >
                                Start Indexing
                            </button>
                        )}

                        {status === 'uploading' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <p style={{ fontWeight: '500' }}>{message}</p>
                                <div style={{ height: '4px', background: 'var(--card-border)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                        animation: 'progress 2s infinite linear'
                                    }} />
                                </div>
                            </div>
                        )}

                        {status === 'success' && (
                            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                {message}
                            </div>
                        )}

                        {status === 'error' && (
                            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)' }}>
                                {message}
                            </div>
                        )}

                        {(status === 'success' || status === 'error') && (
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => setStatus('idle')}
                                style={{ alignSelf: 'center' }}
                            >
                                Upload Another
                            </button>
                        )}
                    </form>
                </section>

                <section className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Indexing Tips</h3>
                    <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px' }}>
                        <li>Ensure PDFs are text-based (scanned images require OCR which is coming soon).</li>
                        <li>Break large documents into smaller files for faster indexing.</li>
                        <li>Clear titles and headings help the AI understand the context better.</li>
                    </ul>
                </section>

                <style jsx>{`
            @keyframes progress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
            </main>
        </div>
    );
}
