import os
import sys

# Add the project root to the python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext, Settings as LlamaIndexSettings
from core.rag.engine import get_vector_store
from core.llm.factory import init_llm_and_embeddings
from config import settings


def main():
    init_llm_and_embeddings()

    print("loading Documents...")
    documents = SimpleDirectoryReader(
        settings.DATA_PATH,
        recursive=True,
        required_exts=[".md", ".pdf", ".docx", ".txt"]
    ).load_data()

    if not documents:
        print("No documents found")
        sys.exit(1)

    print(f"-> Loaded {len(documents)} documents")
    vector_store = get_vector_store()
    storage_context = StorageContext.from_defaults(vector_store=vector_store)


    print("->Creating/updating Index")
    VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
        embed_model=LlamaIndexSettings.embedding,
        show_progress=True
    )

    print("->Ingestion  Complete")

if __name__ == "__main__":
    main()
    