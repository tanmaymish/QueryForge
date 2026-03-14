# 📖 Aura Search - User Guide

Welcome to **Aura Search**! This guide will walk you through how to use your new AI-powered personal knowledge engine.

---

## 🚀 Quick Start (Demo Mode)
If you are viewing the live showcase link and haven't connected your own databases yet, the application runs in **Showcase Demo Mode**. 
You can completely test the UI and workflow without any setup:
1. **Login**: Use *any* email and password.
2. **Upload**: Drag and drop any file; the app will simulate the AI indexing process.
3. **Search**: Try searching for tech terms. The system will return intelligent mock results to demonstrate the UI.

---

## 🧠 Core Workflow (Once configured with API Keys)

### 1. The Dashboard 📊
When you log in, you are greeted by the Dashboard. Here you can see:
- Your total storage usage (e.g., 4.2 GB / 10 GB).
- Your most recently indexed documents.
- Quick stats on your vector database health.

### 2. Upload Center (Indexing Data) ☁️
To make your documents searchable by the AI, they first need to be indexed.
- Navigate to the **Upload Center** on the left sidebar.
- Click the dropzone or drag-and-drop your files.
- **Supported Formats**: 
  - `PDF` (Text-based)
  - `DOCX` (Word Documents)
  - `TXT` / `MD` (Plain text and Markdown)
- Click **Start Indexing**. The server will extract the text, split it into chunks, convert those chunks into mathematical vectors (via OpenAI), and save them securely.

### 3. File Vault 📂
Think of this as your personal Google Drive. 
- All successfully indexed documents will appear here.
- You can review the file names, sizes, and the exact time they were processed by the AI.

### 4. Semantic Search 🔍
This is the heart of Aura Search. Unlike traditional search which strictly looks for exact word matches (like `Control+F`), Semantic Search understands the *meaning* of your question.
- Navigate to the **Search** tab.
- Type a natural language question. *(e.g., "What did the March report say about serverless architecture?")*
- The AI will instantly convert your question into a vector, scan your entire knowledge base in milliseconds, and return the most relevant paragraphs from your documents.

---

## 💡 Pro-Tips for Best Results
- **Clean Documents**: The AI reads text. If your PDF is a scanned image, the AI won't be able to read it without OCR (Optical Character Recognition - coming soon!). Ensure your PDFs have selectable text.
- **Ask Full Questions**: Because it uses Semantic Search, typing a full question yields better results than just typing a single keyword.
- **Wait for Indexing**: Large PDFs take time to be converted into vectors. Ensure the Upload Center says "Success" before trying to search for content within that specific document.
