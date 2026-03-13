'use client';

import Sidebar from '@/components/layout/Sidebar';

export default function DashboardPage() {
    return (
        <div style={{ display: 'flex', paddingLeft: '300px', paddingTop: '40px', paddingRight: '40px', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here is an overview of your knowledge vault.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn-primary" style={{ padding: '10px 20px' }}>+ New Entry</button>
                    </div>
                </header>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    <StatCard label="Total Documents" value="1,248" change="+12%" />
                    <StatCard label="Embeddings Generated" value="45.2k" change="+5.4%" />
                    <StatCard label="Memory Usage" value="4.2 GB" change="Normal" />
                    <StatCard label="Search Queries" value="342" change="+21%" />
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                    <div className="glass-card" style={{ padding: '30px', height: '400px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <ActivityItem title="Indexed Project_Proposal_V2.pdf" time="2 hours ago" type="PDF" />
                            <ActivityItem title="Re-indexed Web Bookmarks" time="5 hours ago" type="Link" />
                            <ActivityItem title="Generated summary for Meeting_Notes.docx" time="Yesterday" type="Doc" />
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <QuickActionButton label="Index Local Folder" icon="📂" />
                            <QuickActionButton label="Connect Notion" icon="📓" />
                            <QuickActionButton label="Export Knowledge Graph" icon="🕸️" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function StatCard({ label, value, change }) {
    return (
        <div className="glass-card" style={{ padding: '24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>{label}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={{ fontSize: '1.8rem' }}>{value}</h2>
                <span style={{
                    fontSize: '0.85rem',
                    color: change.startsWith('+') ? '#10b981' : 'var(--primary)',
                    fontWeight: '600'
                }}>{change}</span>
            </div>
        </div>
    );
}

function ActivityItem({ title, time, type }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '10px'
        }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                }}>{type}</div>
                <div>
                    <p style={{ fontWeight: '500', fontSize: '0.95rem' }}>{title}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{time}</p>
                </div>
            </div>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.9rem' }}>View</button>
        </div>
    );
}

function QuickActionButton({ label, icon }) {
    return (
        <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            color: 'white',
            width: '100%',
            textAlign: 'left',
            transition: 'var(--transition)'
        }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
            <span>{icon}</span>
            <span style={{ fontWeight: '500' }}>{label}</span>
        </button>
    );
}
