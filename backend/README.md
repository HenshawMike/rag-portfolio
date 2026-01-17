# Portfolio Backend API

The backend service for the AI Portfolio, built with FastAPI. It handles document ingestion, vector embedding generation, and RAG (Retrieval-Augmented Generation) queries to answer user questions.

## ⚙️ Prerequisites

- **Python 3.11+**
- **PostgreSQL** (with `pgvector` extension enabled) or a NeonDB connection string.
- **Ollama** (running locally for embeddings) or an external embedding API.

## 🚀 Setup & Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration:**
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/dbname
   OPENROUTER_API_KEY=your_api_key
   # Add other configuration as needed
   ```

5. **Ingest Data:**
   Run the ingestion script to parse your bio and update the vector database.
   ```bash
   python scripts/ingest.py
   ```

## 🏃 Running the Server

Start the FastAPI development server:

```bash
python main.py
```

The API will be available at `http://localhost:8000`.

## 📚 API Documentation

Once the server is running, you can access the interactive API docs at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

Run endpoints directly via the Swagger UI or using tools like Postman/cURL.
