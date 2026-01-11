from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.postgres import PGVectorStore
from sqlalchemy import  make_url
from backend.config import settings
from backend.rag.prompt import PORTFOLIO_QA_PROMPT

def get_vector_store():
    url= make_url(settings.POSTGRES_URL)
    return PGVectorStore(
        database= url.database or "main",
        host = url.host,
        password= url.password,
        port = url.port or 5432,
        user = url.username,
        tablename= settings.PGVECTOR_TABLE_NAME,
        embed_dim = settings.PGVECTOR_EMBED_DIM,
        hybrid_search=True,
    )

def get_query_engine():
    vector_store = get_vector_store()
    index = VectorStoreIndex.from_vector_store(vector_store)
    return index.as_query_engine(
        similarity_top_k =6,
        text_qa_template = PORTFOLIO_QA_PROMPT,
        response_mode = "compact",
        

    )