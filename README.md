<<<<<<< HEAD
# Chat-With-PDF — RAG-based Document Q&A

A **Retrieval-Augmented Generation (RAG)** application that lets you upload PDFs and ask questions about their content using natural language.

## How It Works

**Step 1 — Upload:** User uploads a PDF via the Next.js frontend → Express.js saves it with Multer → pushes a background job to BullMQ (Redis queue) → responds immediately (non-blocking).

**Step 2 — Ingest (background):** Worker picks up the job → PDFLoader extracts text page-by-page → Gemini embedding model (`gemini-embedding-001`) converts each page into a vector → stored in Qdrant vector database.

**Step 3 — Chat:** User asks a question → query is embedded with the same Gemini model → Qdrant finds the top-2 most semantically similar pages → those pages are injected as context into a system prompt → Gemini 2.5 Flash generates an answer grounded in the PDF content.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Auth | Clerk (middleware + provider) |
| Backend | Express.js (port 8000) |
| LLM | Google Gemini 2.5 Flash |
| Embeddings | Google Gemini `gemini-embedding-001` |
| Vector DB | Qdrant (port 6333, collection: `langchainjs-testing`) |
| Job Queue | BullMQ + Valkey/Redis (port 6379) |
| PDF Parsing | LangChain PDFLoader |
| File Uploads | Multer (disk storage to `server/uploads/`) |
| Orchestration | Docker Compose (Valkey + Qdrant) |

## Architecture

```
Frontend (:3000) ──POST /upload/pdf──→ Express (:8000) ──queue.add()──→ Redis Queue
                   ──GET /chat?message=→ Express       ──Qdrant search──→ Vector DB
                                                                       ──Gen AI──→ Gemini

Worker (background) ──picks job──→ PDFLoader ──embed──→ Qdrant
```

## Project Structure
=======
# Chat with PDF - Scalable RAG System

A production-ready **Retrieval-Augmented Generation (RAG)** application that enables intelligent conversations with PDF documents using advanced AI/ML technologies.

## 🚀 Key Features

- **Intelligent PDF Processing**: Upload and process PDF documents with automated chunking and embedding
- **Context-Aware Chat**: Query PDFs using natural language with GPT-4 powered responses
- **Scalable Architecture**: Asynchronous job processing with BullMQ for handling large documents
- **Vector Database Integration**: Qdrant vector store for efficient semantic search
- **Modern Authentication**: Clerk integration for secure user management
- **Responsive UI**: Built with Next.js 15, React 19, and Tailwind CSS

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌──────────────┐
│   Next.js       │         │   Express.js     │         │   BullMQ     │
│   Frontend      │────────▶│   API Server     │────────▶│   Queue      │
│   (React 19)    │         │   (Port 8000)    │         │   (Redis)    │
└─────────────────┘         └──────────────────┘         └──────────────┘
         │                           │                            │
         │                           │                            │
         │                    ┌──────▼────────────────────────────▼──────┐
         │                    │         Worker Process                   │
         │                    │  • PDF Loading                           │
         │                    │  • Text Chunking                         │
         │                    │  • Embedding Generation                  │
         │                    │  • Vector Storage                        │
         │                    └──────────────────────────────────────────┘
         │
┌─────────────────┐         ┌──────────────────┐
│   Qdrant        │◀────────│   LangChain      │
│   Vector DB     │         │   Integration    │
│   (Port 6333)   │         │                  │
└─────────────────┘         └──────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Clerk** - Authentication & user management
- **shadcn/ui** - Modern UI components
- **Lucide React** - Icon library

### Backend
- **Express.js** - REST API server
- **LangChain.js** - LLM orchestration framework
- **OpenAI GPT-4.1** - Language model for chat
- **OpenAI Embeddings** - text-embedding-3-small for vectorization
- **Qdrant** - Vector database for semantic search
- **BullMQ** - Distributed job queue for async processing
- **PDFLoader** - Document parsing
- **CharacterTextSplitter** - Text chunking strategy

### Infrastructure
- **Docker Compose** - Container orchestration
- **Qdrant** - Vector database container
- **Valkey/Redis** - In-memory data store for job queue

## 📊 System Workflow

### 1. PDF Upload Flow
```
User Uploads PDF
       │
       ▼
Express Server (multer)
       │
       ▼
BullMQ Queue (async job)
       │
       ▼
Worker Process
  ├─ PDFLoader extracts text
  ├─ CharacterTextSplitter chunks documents
  ├─ OpenAI Embeddings vectorizes chunks
  └─ Qdrant stores vectors
```

### 2. Chat Flow
```
User Query
       │
       ▼
OpenAI Embeddings (query vectorization)
       │
       ▼
Qdrant Similarity Search (top-k retrieval)
       │
       ▼
LangChain Retriever
       │
       ▼
GPT-4.1 with RAG context
       │
       ▼
Response + Source Documents
```

## 🎯 Technical Highlights

### RAG Implementation
- **Document Ingestion**: Automated PDF parsing with metadata preservation
- **Chunking Strategy**: Character-based text splitting for optimal context windows
- **Embedding Model**: OpenAI's text-embedding-3-small for high-quality vector representations
- **Retrieval**: Top-k similarity search with configurable parameters
- **Context Injection**: Dynamic prompt engineering with retrieved documents

### Scalability Features
- **Asynchronous Processing**: Non-blocking PDF processing with BullMQ
- **Job Queue**: Redis-backed queue for handling concurrent uploads
- **Worker Concurrency**: Configurable worker pool (100 concurrent jobs)
- **Horizontal Scaling**: Stateless API design for multiple instances

### Modern Development Practices
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Component Architecture**: Reusable React components with proper separation of concerns
- **API Design**: RESTful endpoints with proper error handling
- **Environment Configuration**: Centralized configuration management

## 📁 Project Structure
>>>>>>> 10524c8f806bc36ab7ccbcd2e36b4d3b527c529e

```
Chat-With-PDF/
├── client/                          # Next.js Frontend
│   ├── app/
<<<<<<< HEAD
│   │   ├── layout.tsx               # Root layout with Clerk auth
│   │   ├── page.tsx                 # Main page (upload + chat split view)
│   │   └── components/
│   │       ├── file-upload.tsx      # PDF upload with multer POST
│   │       └── chat.tsx             # Chat UI with source documents
│   ├── middleware.ts                # Clerk auth middleware
│   └── package.json
├── server/                          # Express Backend
│   ├── index.js                     # API server (upload + chat endpoints)
│   ├── worker.js                    # BullMQ worker (PDF ingestion)
│   ├── uploads/                     # Temporary PDF storage
│   └── package.json
└── docker-compose.yml               # Valkey + Qdrant containers
```

## API Endpoints

| Method | Path | What It Does |
|---|---|---|
| `POST` | `/upload/pdf` | Upload PDF → queue background job → respond `{message: "uploaded"}` |
| `GET` | `/chat?message=...` | Search PDF → Gemini answers with context → respond `{message, docs}` |

## Running the Project

```bash
# 1. Start infrastructure (Valkey + Qdrant)
docker-compose up -d

# 2. Start backend (separate terminals)
cd server
npm install
npm run dev            # Express API on :8000
npm run dev:worker     # BullMQ worker

# 3. Start frontend
cd client
npm install
npm run dev            # Next.js on :3000

# 4. Set environment variables
# server/.env:  GOOGLE_API_KEY=your_key
# client/.env.local: Clerk keys
```

## Key Concepts Demonstrated

- **RAG Architecture** — Retrieve relevant context → inject into prompt → generate grounded answers
- **Semantic Search** — Vector embeddings + cosine similarity (Qdrant) vs keyword search
- **Async Job Processing** — BullMQ decouples upload from compute-heavy ingestion
- **Prompt Engineering** — System prompt with retrieved context prevents hallucination
- **Modern Full-Stack** — Next.js App Router, Server/Client Components, Clerk auth, Express API

## Potential Improvements

- Add auth verification to backend endpoints
- Per-user vector collections or metadata filtering
- Proper text chunking with overlap (CharacterTextSplitter is imported but unused)
- Error handling + loading states in UI
- File cleanup after processing
- Stream responses via SSE
- PDFs of same content are re-embedded on every upload (no dedup)
=======
│   │   ├── components/
│   │   │   ├── chat.tsx            # Chat interface component
│   │   │   └── file-upload.tsx     # PDF upload component
│   │   ├── layout.tsx              # Root layout with Clerk auth
│   │   └── page.tsx                # Main application page
│   ├── components/
│   │   └── ui/                     # shadcn/ui components
│   ├── public/
│   └── package.json
│
├── server/                          # Express.js Backend
│   ├── index.js                    # API server with endpoints
│   ├── worker.js                   # BullMQ worker for PDF processing
│   ├── uploads/                    # Temporary file storage
│   └── package.json
│
└── docker-compose.yml              # Infrastructure orchestration
```

## 🔧 API Endpoints

### POST /upload/pdf
Upload a PDF file for processing
- **Input**: Multipart form data with PDF file
- **Process**: Queues async job for embedding generation
- **Response**: Upload confirmation

### GET /chat
Query the PDF knowledge base
- **Parameters**: `message` - User query string
- **Process**: 
  1. Vectorize query
  2. Retrieve relevant document chunks
  3. Generate response with GPT-4
- **Response**: AI response with source documents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- OpenAI API Key
- Clerk API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ChaitanyaMANIT/Chat-With-Pdf-RAG.git
cd Chat-With-PDF
```

2. **Start infrastructure services**
```bash
docker-compose up -d
```
This starts:
- Qdrant vector database on port 6333
- Valkey/Redis on port 6379

3. **Setup backend**
```bash
cd server
npm install
npm run dev          # Starts Express server on port 8000
npm run dev:worker   # Starts BullMQ worker (in separate terminal)
```

4. **Setup frontend**
```bash
cd client
npm install
npm run dev          # Starts Next.js on port 3000
```

5. **Configure environment variables**
```env
# server/.env
OPENAI_API_KEY=your_openai_api_key

# client/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

## 🧪 Key Technical Concepts Demonstrated

### 1. **Retrieval-Augmented Generation (RAG)**
- Combines LLM capabilities with external knowledge bases
- Reduces hallucinations by grounding responses in actual document content
- Enables domain-specific AI assistants without fine-tuning

### 2. **Vector Databases & Embeddings**
- Semantic search using high-dimensional vector representations
- Cosine similarity for finding relevant document chunks
- Efficient nearest-neighbor search at scale

### 3. **Asynchronous Job Processing**
- Decouples file upload from processing
- Improves user experience with immediate feedback
- Enables handling of large documents without blocking

### 4. **Modern Full-Stack Architecture**
- Separation of concerns between client and server
- Type-safe API contracts with TypeScript
- Component-based UI development

### 5. **Authentication & Security**
- Third-party auth integration (Clerk)
- Protected routes and user sessions
- Secure API design patterns

## 📈 Performance Considerations

- **Embedding Caching**: Reuse embeddings for repeated queries
- **Chunk Size Optimization**: Balance between context and precision
- **Connection Pooling**: Efficient database connections
- **Worker Concurrency**: Parallel processing for faster ingestion
- **Frontend Optimization**: Next.js SSR/SSG for performance

## 🔮 Potential Enhancements

- Multi-PDF support with conversation history
- Advanced chunking strategies (semantic, recursive)
- Hybrid search (vector + keyword)
- Citation and source highlighting
- Document management dashboard
- User-specific vector collections
- Streaming responses for better UX
- Rate limiting and API quotas
- Monitoring and logging (Prometheus, Grafana)
- CI/CD pipeline for automated deployment

## 📝 Learning Outcomes

This project demonstrates proficiency in:
- **AI/ML Engineering**: RAG systems, embeddings, vector databases
- **Full-Stack Development**: Modern React, Node.js, TypeScript
- **System Design**: Scalable architecture, async processing
- **DevOps**: Docker, containerization, orchestration
- **API Design**: RESTful services, error handling
- **Database Design**: Vector stores, similarity search

## 👨‍💻 Author

**Chaitanya MANIT**
- GitHub: [@ChaitanyaMANIT](https://github.com/ChaitanyaMANIT)

## 📄 License

ISC License

---

**Note**: This is a demonstration project showcasing modern RAG implementation patterns. For production use, add proper error handling, logging, monitoring, and security measures.
>>>>>>> 10524c8f806bc36ab7ccbcd2e36b4d3b527c529e
