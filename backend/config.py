from pydantic_settings import   BaseSettings
import os
class Settings(BaseSettings):

    LLM_PROVIDER: str = "openrouter"
    LLM_API_KEY: str = os.environ.get("OPENROUTER_API_KEY")
    LLM_MODEL: str = ""
    LLM_BASE_URL: str = "https://api.openrouter.ai/api/v1"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_EMBED_MODEL: str = "nomic-embed-text-latest"
    POSTGRES_URL: str = os.environ.get("POSTGRES_URL")
    PGVECTOR_TABLE_NAME: str = "portfolio_vectors"
    PGVECTOR_EMBED_DIM: int = 768  # nomic-embed-text
    DATA_PATH: str = "./data"


settings= Settings()
