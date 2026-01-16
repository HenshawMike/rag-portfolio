from urllib.parse import quote
from core.rag.engine import get_query_engine
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Update the settings
from config import settings

print(f"Connecting to database with URL: {settings.POSTGRES_URL.split('@')[0]}****@****")

# Try to get the query engine
try:
    engine = get_query_engine()
    print("✅ Successfully connected to the database!")
    response = engine.query("test question")
    print(response)
except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"❌ Error connecting to the database: {e}")
    print("\nTroubleshooting steps:")
    print("1. Make sure your .env file has the correct POSTGRES_PASSWORD")
    print("2. Verify the database name and username (neondb_owner) are correct")
    print("3. Check if your Neon database is running and accessible")
    print("4. Make sure the pgvector extension is enabled in your Neon dashboard")
    print("5. Verify your IP is allowed in the Neon dashboard's connection settings")