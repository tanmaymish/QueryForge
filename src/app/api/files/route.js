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
