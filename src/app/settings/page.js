'use client';

import Sidebar from '@/components/layout/Sidebar';

export default function SettingsPage() {
    return (
        <div style={{ display: 'flex', paddingLeft: '300px', paddingTop: '40px', paddingRight: '40px', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px' }}>
                <header>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Settings</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Configure your AI search engine and cloud integrations.</p>
                </header>

                <section className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>AI Configurations</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>OpenAI API Key</label>
                                <input className="input-field" type="password" placeholder="sk-••••••••••••••••" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pinecone API Key</label>
                                <input className="input-field" type="password" placeholder="••••••••-••••-••••-••••-••••••••••••" />
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--card-border)' }} />

                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Preferences</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <div>
                                <p style={{ fontWeight: '500' }}>Dark Mode</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Always on for maximum focus</p>
                            </div>
                            <div style={{ width: '40px', height: '20px', background: 'var(--primary)', borderRadius: '10px' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                        <button className="btn-primary">Save Changes</button>
                        <button style={{ background: 'none', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '12px 24px', borderRadius: '12px', fontWeight: '600' }}>Log Out</button>
                    </div>
                </section>
            </main>
        </div>
    );
}
