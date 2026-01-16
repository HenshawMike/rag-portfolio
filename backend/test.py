from urllib.parse import quote
from core.rag.engine import get_query_engine
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the password from environment variables
password = os.getenv("POSTGRES_PASSWORD")
if not password:
    raise ValueError("POSTGRES_PASSWORD not found in environment variables")

# Properly encode the password
password_enc = quote(password)

# Construct the connection string
POSTGRES_URL = f"postgresql://neondb_owner:{password_enc}@ep-ancient-paper-ah7oqny3-pooler.us-east-1.aws.neon.tech/rag-folio?sslmode=require"

print(f"Connecting to database with URL: postgresql://neondb_owner:****@ep-ancient-paper-ah7oqny3-pooler.us-east-1.aws.neon.tech/rag-folio?sslmode=require")

# Update the settings
from config import settings
settings.POSTGRES_URL = POSTGRES_URL

# Try to get the query engine
try:
    engine = get_query_engine()
    print("✅ Successfully connected to the database!")
    response = engine.query("test question")
    print(response)
except Exception as e:
    print(f"❌ Error connecting to the database: {e}")
    print("\nTroubleshooting steps:")
    print("1. Make sure your .env file has the correct POSTGRES_PASSWORD")
    print("2. Verify the database name and username (neondb_owner) are correct")
    print("3. Check if your Neon database is running and accessible")
    print("4. Make sure the pgvector extension is enabled in your Neon dashboard")
    print("5. Verify your IP is allowed in the Neon dashboard's connection settings")