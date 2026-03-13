import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractText(buffer, mimeType) {
    if (mimeType === 'application/pdf') {
        const data = await pdf(buffer);
        return data.text;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const data = await mammoth.extractRawText({ buffer });
        return data.value;
    } else if (mimeType === 'text/plain' || mimeType === 'text/markdown') {
        return buffer.toString('utf-8');
    }
    return '';
}

export function chunkText(text, size = 1000, overlap = 200) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        chunks.push(text.slice(i, i + size));
        i += (size - overlap);
    }
    return chunks;
}
