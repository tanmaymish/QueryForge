import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getIndex } from '@/lib/pinecone';
import { extractText, chunkText } from '@/lib/parser';
import { getEmbeddings } from '@/lib/embeddings';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        // 1. Auth Check
        const token = (await cookies()).get('auth_token')?.value;
        const user = token ? await verifyToken(token) : null;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Parse Multipart Data
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const client = await clientPromise;
        const index = getIndex();

        // QUICK DEMO MODE FALLBACK (Skip heavy processing if no keys)
        if (!client || !index || !process.env.OPENAI_API_KEY) {
            console.warn('Upload: Running in Demo Mode (Resources missing)');
            return NextResponse.json({
                message: 'Demo Mode: Indexing simulation complete',
                docId: 'demo_' + Date.now(),
                chunks: 5
            });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type;
        const fileName = file.name;

        // 3. Extract & Chunk Text
        const text = await extractText(buffer, mimeType);
        if (!text) {
            return NextResponse.json({ error: 'Could not extract text' }, { status: 400 });
        }

        const chunks = chunkText(text);

        // 4. Save Metadata to MongoDB
        const db = client.db(process.env.MONGODB_DB || 'aura_search');
        const docEntry = await db.collection('documents').insertOne({
            userId: user.userId,
            fileName,
            mimeType,
            size: file.size,
            indexedAt: new Date(),
            status: 'processing'
        });

        const docId = docEntry.insertedId.toString();

        // 5. Index in Pinecone
        const vectorRecords = [];

        for (let i = 0; i < chunks.length; i++) {
            const vector = await getEmbeddings(chunks[i]);
            vectorRecords.push({
                id: `${docId}_${i}`,
                values: vector,
                metadata: {
                    userId: user.userId,
                    docId: docId,
                    fileName,
                    text: chunks[i]
                }
            });
        }

        // Upsert to Pinecone
        await index.upsert(vectorRecords);

        // 6. Update MongoDB Status
        await db.collection('documents').updateOne(
            { _id: docEntry.insertedId },
            { $set: { status: 'completed' } }
        );

        return NextResponse.json({
            message: 'Indexing complete',
            docId,
            chunks: chunks.length
        });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Indexing failed: ' + error.message }, { status: 500 });
    }
}
