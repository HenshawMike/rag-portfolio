from sqlalchemy import create_engine, text
from llama_index.vector_stores.postgres import PGVectorStore
from llama_index.core import VectorStoreIndex, Settings as LlamaIndexSettings
from config import settings
from core.rag.prompt import PORTFOLIO_QA_PROMPT
from core.llm.factory import init_llm_and_embeddings

# --------------------------------------------------
# One-time LLM + embedding initialization
# --------------------------------------------------
init_llm_and_embeddings()


# --------------------------------------------------
# Ensure table exists
# --------------------------------------------------
def ensure_vector_table():
    """
    Create the vector table in Neon if it doesn't exist.
    """
    engine = create_engine(settings.POSTGRES_URL)

    create_table_sql = f"""
    CREATE TABLE IF NOT EXISTS {settings.PGVECTOR_TABLE_NAME} (
        id TEXT PRIMARY KEY,
        embedding VECTOR({settings.PGVECTOR_EMBED_DIM}),
        metadata JSONB
    );
    """

    with engine.begin() as conn:
        conn.execute(text(create_table_sql))


# --------------------------------------------------
# Vector store setup
# --------------------------------------------------
def get_vector_store() -> PGVectorStore:
    # Ensure table exists
    ensure_vector_table()

    # Create a properly formatted connection string
    connection_string = settings.POSTGRES_URL
    
    # Ensure the connection string has the required format
    if not connection_string.startswith('postgresql://'):
        if connection_string.startswith('postgres://'):
            connection_string = connection_string.replace('postgres://', 'postgresql://', 1)
        else:
            connection_string = f"postgresql://{connection_string}"
    
    # Add sslmode=require if not present
    if 'sslmode' not in connection_string:
        if '?' in connection_string:
            connection_string += '&sslmode=require'
        else:
            connection_string += '?sslmode=require'

    print(f"Using connection string: {connection_string.split('@')[0]}****@****")  # Log redacted connection string

    return PGVectorStore(
        connection_string=connection_string,
        table_name=settings.PGVECTOR_TABLE_NAME,
        embed_dim=settings.PGVECTOR_EMBED_DIM,
        hybrid_search=False,  # Disabled for Neon compatibility
    )


# --------------------------------------------------
# RAG Query engine
# --------------------------------------------------
def get_query_engine():
    vector_store = get_vector_store()

    index = VectorStoreIndex.from_vector_store(
        vector_store=vector_store,
        embed_model=LlamaIndexSettings.embedding,
    )

    return index.as_query_engine(
        similarity_top_k=6,
        text_qa_template=PORTFOLIO_QA_PROMPT,
        response_mode="compact",
    )
