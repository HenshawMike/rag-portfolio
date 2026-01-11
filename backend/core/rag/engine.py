from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.postgres import PGVectorStore
from sqlalchemy import  make_url
from backend.config import settings
from backend.rag.prompt import PORTFOLIO_QA_PROMPT

