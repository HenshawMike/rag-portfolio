#!/bin/bash

# Start Ollama in the background
echo "Starting Ollama service..."
ollama serve &

# Wait for Ollama to start
echo "Waiting for Ollama to be ready..."
until curl -s http://localhost:11434 > /dev/null; do
  sleep 2
done

# Pull the required embedding model
echo "Pulling embedding model: $OLLAMA_EMBED_MODEL..."
if [ -z "$OLLAMA_EMBED_MODEL" ]; then
  OLLAMA_EMBED_MODEL="nomic-embed-text:latest"
fi
ollama pull $OLLAMA_EMBED_MODEL

# Start the FastAPI backend with 1 worker to save memory
echo "Starting FastAPI backend..."
exec gunicorn main:app -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
