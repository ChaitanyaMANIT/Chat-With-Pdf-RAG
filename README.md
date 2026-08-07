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

```
Chat-With-PDF/
├── client/                          # Next.js Frontend
│   ├── app/
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
