# AI Engineer Portfolio with RAG

A modern, interactive portfolio application featuring a custom AI assistant powered by Retrieval-Augmented Generation (RAG). The AI can answer questions about your experience, projects, and skills by querying a vector database containing your professional bio and portfolio data.

![Project Screenshot](frontend/public/images/Henshaw_Michael.jpeg)

## 🚀 Features

- **Interactive AI Chat**: Real-time Q&A with an AI that "knows" you.
- **RAG Architecture**: Uses vector embeddings to provide accurate, context-aware responses.
- **Modern UI**: specialized ChatGPT-like interface built with React and Tailwind CSS.
- **Responsive Design**: Fully functional on desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **State Management**: React Hooks

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with `pgvector`
- **LLM Engine**: Ollama (Embeddings) + OpenRouter/OpenAI (LLM)
- **Vector Search**: ChromaDB / PGVector logic

## 📂 Project Structure

- `frontend/`: React application code, components, and assets.
- `backend/`: FastAPI server, RAG engine, and database scripts.

## 🏁 Quick Start

To get the entire application running locally, you need to set up both the backend and frontend services.

1. **Backend Setup**: [Read the Backend Guide](./backend/README.md)
2. **Frontend Setup**: [Read the Frontend Guide](./frontend/README.md)

## 📄 License

This project is open-source and available under the query license.
