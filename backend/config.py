from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
from urllib.parse import quote
from pydantic import Field, model_validator

class Settings(BaseSettings):

    # LLM
    LLM_PROVIDER: str = "openrouter"
    LLM_API_KEY: Optional[str] = None
    LLM_MODEL: str = "openrouter/deepseek/deepseek-r1-0528:free"
    LLM_BASE_URL: str = "https://api.openrouter.ai/api/v1"

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_EMBED_MODEL: str = "nomic-embed-text:latest"

    # Data base
    POSTGRES_URL: str
    POSTGRES_USERNAME: str = "neondb_owner"
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "rag-folio"

    @model_validator(mode="after")
    def assemble_db_connection(self):
        if self.POSTGRES_PASSWORD and self.POSTGRES_HOST:
            encoded_pwd = quote(self.POSTGRES_PASSWORD)
            self.POSTGRES_URL = f"postgresql://{self.POSTGRES_USERNAME}:{encoded_pwd}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}?sslmode=require"
        return self

    # Vector store
    PGVECTOR_TABLE_NAME: str = "portfolio_vectors"
    PGVECTOR_EMBED_DIM: int = 768

    # App
    DATA_PATH: str = "./data"
    PROJECT_NAME: str = "Portfolio RAG"
    API_V1_STR: str = "/ask"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
