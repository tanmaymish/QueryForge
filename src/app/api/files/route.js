import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const token = (await cookies()).get('auth_token')?.value;
        const user = token ? await verifyToken(token) : null;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const client = await clientPromise;
        if (!client) {
            console.warn('Files: Running in Demo Mode (No MongoDB)');
            return NextResponse.json({
                documents: [
                    {
                        fileName: 'Sample_Knowledge_Base.pdf',
                        mimeType: 'application/pdf',
                        size: 1024 * 45,
                        status: 'completed',
                        indexedAt: new Date(Date.now() - 86400000).toISOString()
                    },
                    {
                        fileName: 'Aura_Guide.docx',
                        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        size: 1024 * 12,
                        status: 'completed',
                        indexedAt: new Date(Date.now() - 172800000).toISOString()
                    }
                ]
            });
        }

        const db = client.db(process.env.MONGODB_DB || 'aura_search');
        const documents = await db.collection('documents')
            .find({ userId: user.userId })
            .sort({ indexedAt: -1 })
            .toArray();

        return NextResponse.json({ documents });
    } catch (error) {
        console.error('Fetch Files Error:', error);
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
    }
}
