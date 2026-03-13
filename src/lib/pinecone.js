import { Pinecone } from '@pinecone-database/pinecone';

const apiKey = process.env.PINECONE_API_KEY;

export const pinecone = apiKey ? new Pinecone({
    apiKey: apiKey,
}) : null;

export const getIndex = () => {
    if (!pinecone) return null;
    const indexName = process.env.PINECONE_INDEX_NAME || 'aura-search';
    return pinecone.index(indexName);
};
