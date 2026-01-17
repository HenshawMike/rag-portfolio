import os
import sys

# Add the project root to the python path
sys.path.append(os.getcwd())

from core.llm.factory import get_llm
from config import settings

def test_llm():
    print(f"Testing LLM with Provider: {settings.LLM_PROVIDER}")
    print(f"Model: {settings.LLM_MODEL}")
    print(f"Base URL: {settings.LLM_BASE_URL}")
    print(f"API Key present: {'Yes' if settings.LLM_API_KEY else 'No'}")
    
    try:
        llm = get_llm()
        response = llm.complete("Say hello")
        print(f"Success! Response: {response}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_llm()
