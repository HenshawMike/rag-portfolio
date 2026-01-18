import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from core.llm.factory import init_llm_and_embeddings
from api.v1.endpoints import router as api_router


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Interactive Portfolio powered by RAG + Ollama embeddings + OpenRouter LLM",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "https://mikes-rag-portfolio.netlify.app"
    ],           
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_llm_and_embeddings()

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Mike's Interactive Portfolio RAG API!",
        "docs": "/docs",      
        "redoc": "/redoc",    
        "health": "/health"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.PROJECT_NAME}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,          
        log_level="info"
    )