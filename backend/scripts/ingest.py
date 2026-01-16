import sys 
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext
from rag.engine import get_vector_store
from llm.factory import init_llm_and_embeddings
from config import settings


def main():
    init_llm_and_embeddings()

    print("loading Documents...")
    documents = SimpleDirectoryReader(
        settings.DATA_PATH,
        recursive=True,
        required_ext=[".md", ".pdf", ".docx", ".txt"]
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
        show_progress=True
    )

    print("->Ingestion  Complete")

if __name__ == "__main__":
    main()
    