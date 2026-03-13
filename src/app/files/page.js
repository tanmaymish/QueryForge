'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function FilesPage() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/files')
            .then(res => res.json())
            .then(data => {
                setFiles(data.documents || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div style={{ display: 'flex', paddingLeft: '300px', paddingTop: '40px', paddingRight: '40px', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <header>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>File Vault</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and view all your indexed knowledge assets.</p>
                </header>

                <section className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <tr>
                                <th style={{ padding: '20px' }}>File Name</th>
                                <th style={{ padding: '20px' }}>Type</th>
                                <th style={{ padding: '20px' }}>Size</th>
                                <th style={{ padding: '20px' }}>Status</th>
                                <th style={{ padding: '20px' }}>Indexed On</th>
                                <th style={{ padding: '20px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, idx) => (
                                <tr key={idx} style={{ borderTop: '1px solid var(--card-border)', transition: 'var(--transition)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '20px', fontWeight: '500' }}>{file.fileName}</td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{file.mimeType.split('/')[1].toUpperCase()}</td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</td>
                                    <td style={{ padding: '20px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            background: file.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: file.status === 'completed' ? '#10b981' : '#f59e0b',
                                            fontWeight: '600'
                                        }}>
                                            {file.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        {new Date(file.indexedAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>View</button>
                                    </td>
                                </tr>
                            ))}
                            {files.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                                        No files found. Go to Upload Center to index your first document!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
