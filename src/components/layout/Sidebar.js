'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Search', path: '/search', icon: '🔍' },
    { name: 'Upload Center', path: '/upload', icon: '📤' },
    { name: 'File Vault', path: '/files', icon: '📁' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="glass-card" style={{
            width: '260px',
            height: 'calc(100vh - 40px)',
            position: 'fixed',
            left: '20px',
            top: '20px',
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 10px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    borderRadius: '8px'
                }} />
                <h2 style={{ fontSize: '1.4rem' }}>Aura</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            color: isActive ? 'white' : 'var(--text-muted)',
                            background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            transition: 'var(--transition)',
                            fontWeight: isActive ? '600' : '400'
                        }}>
                            <span>{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div style={{ marginTop: 'auto', padding: '10px' }}>
                <div className="glass-card" style={{
                    padding: '15px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    fontSize: '0.85rem'
                }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Storage Usage</p>
                    <div style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                    }}>
                        <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }} />
                    </div>
                    <p style={{ marginTop: '8px', fontWeight: '500' }}>4.2 GB / 10 GB</p>
                </div>
            </div>
        </aside>
    );
}
