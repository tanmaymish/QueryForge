import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
    throw new Error('Please add your PINECONE_API_KEY to .env.local');
}

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

export const getIndex = () => {
    const indexName = process.env.PINECONE_INDEX_NAME || 'aura-search';
    return pinecone.index(indexName);
};
