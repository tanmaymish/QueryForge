import { NextResponse } from 'next/server';
import { getIndex } from '@/lib/pinecone';
import { getEmbeddings } from '@/lib/embeddings';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request) {
    try {
        // 1. Auth Check
        const token = (await cookies()).get('auth_token')?.value;
        const user = token ? await verifyToken(token) : null;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Extract Query
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // 3. Generate Query Vector
        const queryVector = await getEmbeddings(query);

        // 4. Query Pinecone
        const index = getIndex();
        const queryResponse = await index.query({
            vector: queryVector,
            topK: 10,
            includeMetadata: true,
            filter: {
                userId: user.userId
            }
        });

        // 5. Format Results
        const results = queryResponse.matches.map(match => ({
            score: match.score,
            id: match.metadata.docId,
            fileName: match.metadata.fileName,
            text: match.metadata.text,
        }));

        return NextResponse.json({ results });

    } catch (error) {
        console.error('Search Error:', error);
        return NextResponse.json({ error: 'Search failed: ' + error.message }, { status: 500 });
    }
}
