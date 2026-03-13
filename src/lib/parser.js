export async function extractText(buffer, mimeType) {
    if (mimeType === 'application/pdf') {
        try {
            // Dynamic import to prevent build errors and memory issues in serverless
            const pdfModule = await import('pdf-parse');
            const pdfParse = pdfModule.default ?? pdfModule;
            const data = await pdfParse(buffer);
            return data.text;
        } catch (err) {
            console.error('PDF Parse Error:', err);
            throw new Error('PDF processing failed on the server.');
        }
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
            const mammoth = await import('mammoth');
            const data = await mammoth.extractRawText({ buffer });
            return data.value;
        } catch (err) {
            console.error('Word Parse Error:', err);
            throw new Error('Word document processing failed.');
        }
    } else if (mimeType === 'text/plain' || mimeType === 'text/markdown') {
        return buffer.toString('utf-8');
    }
    return '';
}

export function chunkText(text, size = 1000, overlap = 200) {
    if (!text) return [];
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        chunks.push(text.slice(i, i + size));
        i += (size - overlap);
    }
    return chunks;
}
