from fastapi import Depends
from llama_index.core.query_engine import BaseQueryEngine
from core.rag.engine import  get_query_engine


def get_rag_engine() -> BaseQueryEngine:
    return get_query_engine()