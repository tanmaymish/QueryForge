import axios from 'axios';

export async function getEmbeddings(text) {
    // If OpenAI key is available
    if (process.env.OPENAI_API_KEY) {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/embeddings',
                {
                    input: text,
                    model: 'text-embedding-3-small',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );
            return response.data.data[0].embedding;
        } catch (error) {
            console.error('OpenAI Embedding Error:', error?.response?.data || error.message);
        }
    }

    // Fallback to Hugging Face if configured
    if (process.env.HUGGINGFACE_API_KEY) {
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
                { inputs: text },
                {
                    headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Hugging Face Embedding Error:', error.message);
        }
    }

    // Placeholder for development (random vector to avoid crashes)
    console.warn('No Embedding API key configured. Using placeholder vector.');
    return Array.from({ length: 1536 }, () => Math.random());
}
