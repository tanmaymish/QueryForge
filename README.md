# Aura Search | Personal AI Knowledge Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tanmaymish/QueryForge)

**🌐 Live Demo:** [https://kaleidoscopic-kringle-c28ec8.netlify.app](https://kaleidoscopic-kringle-c28ec8.netlify.app)

An AI-powered personal knowledge search engine that indexes documents and multimedia files to enable fast semantic search across local data. Built with a unified Next.js architecture using Node.js serverless functions and vector embeddings to deliver intelligent search, metadata filtering, and real-time indexing.

## ✨ Features

- **Semantic Search**: Ask questions in plain English to find relevant passages.
- **Support for PDFs & Docs**: Seamlessly indexes various document types.
- **Glassmorphic UI**: High-end modern design system.
- **Privacy First**: Secure JWT authentication and private vector storage.

## 🏗️ System Architecture

```mermaid
graph TD
    %% Styling
    classDef client fill:#6366f1,stroke:#333,stroke-width:2px,color:#fff;
    classDef api fill:#a855f7,stroke:#333,stroke-width:2px,color:#fff;
    classDef db fill:#10b981,stroke:#333,stroke-width:2px,color:#fff;
    classDef ai fill:#f43f5e,stroke:#333,stroke-width:2px,color:#fff;

    %% Nodes
    A[Next.js Frontend UI]:::client
    B[Upload API Route]:::api
    C[Search API Route]:::api
    D[Document Parser]:::api
    E[Embedding Model]:::ai
    F[(MongoDB Atlas Metadata)]:::db
    G[(Pinecone DB Vectors)]:::db

    %% Connections
    A -->|1. Upload File| B
    B -->|2. Extract Text| D
    D -->|3. Save Metadata| F
    D -->|4. Chunk Text| E
    E -->|5. Store Embeddings| G

    A -->|A. Search Query| C
    C -->|B. Embed Query| E
    C -->|C. Similarity Search| G
    G -->|D. Return Best Matches| A
```

## 🛠️ Tech Stack

- **Frontend/Backend**: Next.js 15+ (App Router, Serverless Functions)
- **Database**: MongoDB Atlas (Metadata)
- **Vector Search**: Pinecone (Serverless)
- **Embeddings**: AI-powered vector generation
- **Styling**: Premium Vanilla CSS

## 🚀 Setup & Installation

### 1. Prerequisites
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.
- [Pinecone](https://www.pinecone.io/) account (Index dimension: 1536).
- [OpenAI](https://openai.com/) API key (or Hugging Face).

### 2. Configure Environment
Create a `.env.local` file in the root:
```env
MONGODB_URI=your_mongodb_atlas_uri
MONGODB_DB=aura_search
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=aura-search
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

### 3. Run Locally
```bash
npm install
npm run dev
```

## ☁️ Deploying to Netlify

1. Fork this repository.
2. Link to Netlify.
3. Set the **Build Command**: `next build`.
4. Set the **Publish Directory**: `.next`.
5. Add your Environment Variables in the Netlify site settings.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
