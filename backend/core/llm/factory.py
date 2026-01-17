from llama_index.core.llms import LLM
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core import Settings
from config import settings

def get_llm()->LLM:
    if settings.LLM_PROVIDER:
        return OpenAI(
            model_name= settings.LLM_MODEL,
            api_key= settings.LLM_API_KEY,
            api_base= settings.LLM_BASE_URL,
            temperature=0.7
        )
    raise ValueError(f"Unsupported LLM provider: {settings.LLM_PROVIDER}")


def init_llm_and_embeddings():
    Settings.llm =  get_llm()
    Settings.embedding = OllamaEmbedding(
        model_name =settings.OLLAMA_EMBED_MODEL,
        base_url=settings.OLLAMA_BASE_URL,
    )